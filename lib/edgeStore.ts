import { seedState, type StoreState } from "@/lib/storeSeed";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";

const STORE_FILE = join(process.cwd(), "store-data.json");
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

function isStoreState(v: unknown): v is StoreState {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  if (!Array.isArray(obj.products)) return false;
  if (!obj.config || typeof obj.config !== "object") return false;
  if (typeof (obj.config as Record<string, unknown>).usdRate !== "number") return false;
  if (typeof (obj.config as Record<string, unknown>).announcement !== "string") return false;
  return true;
}

// Track changes for Discord notification
interface PriceChange {
  id: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  oldCompareAt?: number;
  newCompareAt?: number;
}

function compareStates(oldState: StoreState, newState: StoreState): PriceChange[] {
  const changes: PriceChange[] = [];

  const oldProductMap = new Map(oldState.products.map((p) => [p.id, p]));
  const newProductMap = new Map(newState.products.map((p) => [p.id, p]));

  for (const newProduct of newState.products) {
    const oldProduct = oldProductMap.get(newProduct.id);
    if (oldProduct) {
      if (
        oldProduct.priceTRY !== newProduct.priceTRY ||
        oldProduct.compareAtTRY !== newProduct.compareAtTRY
      ) {
        changes.push({
          id: newProduct.id,
          name: newProduct.name,
          oldPrice: oldProduct.priceTRY,
          newPrice: newProduct.priceTRY,
          oldCompareAt: oldProduct.compareAtTRY,
          newCompareAt: newProduct.compareAtTRY,
        });
      }
    }
  }

  return changes;
}

// Send Discord notification
async function sendDiscordNotification(changes: PriceChange[], isAnnouncement?: string) {
  if (!DISCORD_WEBHOOK) {
    console.log("ℹ️  DISCORD_WEBHOOK_URL not set, skipping notification");
    return;
  }

  try {
    if (isAnnouncement) {
      // Announcement notification
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🎤 Announcement Updated",
              description: `"${isAnnouncement}"`,
              color: 16776960, // Yellow
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      console.log("✅ Sent Discord announcement notification");
      return;
    }

    if (changes.length === 0) {
      return; // No changes
    }

    // Price change notifications
    const embeds = [
      {
        title: changes.length === 1 ? "💰 1 Price Updated" : `💰 ${changes.length} Prices Updated`,
        color: 3447003, // Blue
        fields: changes.slice(0, 24).map((c) => {
          const oldStr = `${c.oldPrice} TRY`;
          const newStr = `${c.newPrice} TRY`;
          const diff = c.newPrice - c.oldPrice;
          const arrow = diff > 0 ? "📈" : diff < 0 ? "📉" : "➡️";
          return {
            name: `${arrow} ${c.name}`,
            value: `\`${oldStr}\` → \`${newStr}\``,
            inline: true,
          };
        }),
        footer: {
          text: `Updated at ${new Date().toLocaleString()}`,
        },
        timestamp: new Date().toISOString(),
      },
    ];

    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds }),
    });
    console.log("✅ Sent Discord price notification");
  } catch (error) {
    console.warn("⚠️  Failed to send Discord notification:", (error as Error).message);
  }
}

// Non-blocking async git push
function asyncGitPush() {
  try {
    const child = spawn("git", ["push", "origin", "main"], {
      cwd: process.cwd(),
      detached: true,
      stdio: "pipe",
    });
    child.unref();
  } catch (e) {
    // Silently fail
  }
}

// READ - Load from JSON file ONLY
// CRITICAL: Never use seedState for pricing - only use store-data.json
export async function getState(): Promise<StoreState> {
  if (!existsSync(STORE_FILE)) {
    console.error("❌ CRITICAL: store-data.json not found! Using placeholder seed data.");
    return seedState;
  }

  try {
    const buffer = readFileSync(STORE_FILE);
    const jsonString = buffer.toString("utf-8").replace(/^\uFEFF/, ""); // Remove BOM
    const data = JSON.parse(jsonString) as unknown;

    if (isStoreState(data)) {
      console.log("✅ Loaded pricing from store-data.json");
      return data;
    }

    console.error("❌ store-data.json is invalid format, using seed");
    return seedState;
  } catch (error) {
    console.error("❌ Failed to read store-data.json:", (error as Error).message);
    return seedState;
  }
}

// WRITE - Save to file immediately with Discord notifications
export async function setState(next: StoreState): Promise<void> {
  try {
    // Get current state to detect changes
    let oldState = seedState;
    if (existsSync(STORE_FILE)) {
      try {
        const buffer = readFileSync(STORE_FILE);
        const jsonString = buffer.toString("utf-8").replace(/^\uFEFF/, "");
        const data = JSON.parse(jsonString) as unknown;
        if (isStoreState(data)) {
          oldState = data;
        }
      } catch {
        // Use seed if parse fails
      }
    }

    // Detect changes
    const priceChanges = compareStates(oldState, next);
    const announcementChanged = oldState.config.announcement !== next.config.announcement;

    // Write file immediately
    const jsonContent = JSON.stringify(next, null, 2) + "\n";
    writeFileSync(STORE_FILE, jsonContent, "utf-8");
    console.log("✅ Saved to store-data.json");

    // Send Discord notifications
    if (priceChanges.length > 0) {
      await sendDiscordNotification(priceChanges);
    }
    if (announcementChanged) {
      await sendDiscordNotification([], next.config.announcement);
    }

    // Git commit and push (async)
    try {
      const { execSync } = await import("child_process");
      execSync("git add store-data.json", { cwd: process.cwd(), stdio: "pipe" });
      execSync('git commit -m "Auto: Update from admin panel"', {
        cwd: process.cwd(),
        stdio: "pipe",
      });
      console.log("🚀 Committing to GitHub...");
      asyncGitPush();
    } catch (gitError) {
      console.warn("⚠️  Git commit skipped - likely no changes");
    }
  } catch (error) {
    console.error("❌ Failed to save:", (error as Error).message);
    throw new Error("Could not save prices");
  }
}

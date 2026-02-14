# 🎉 Fully Interactive Admin Panel with Discord Webhooks

## What's New

Your admin panel now sends **real-time Discord notifications** whenever prices or announcements are updated. This is fully automated and interactive!

## How It Works

```
1. You update prices/announcement in admin panel
2. Click "Save" → Instantly saved to store-data.json
3. Discord webhook fires automatically (real-time notification)
4. Changes auto-commit to GitHub
5. Vercel redeploys within 1-2 minutes
6. Everyone sees updates globally
```

## Discord Notifications

### 📊 Price Change Notifications
When you update prices, Discord shows:
- Product name
- Old price → New price
- Up/down arrow indicators (📈📉)
- Timestamp
- Up to 24 price changes per message

Example:
```
💰 3 Prices Updated

📉 Black Graphic Hoodie: `1200 TRY` → `1450 TRY`
📈 White Graphic Hoodie: `1200 TRY` → `900 TRY`
➡️  Purple Graphic Hoodie: `1200 TRY` → `1200 TRY`

Updated at 2/14/2026, 3:45 PM
```

### 🎤 Announcement Notifications
When you update the announcement bar, Discord shows:
```
🎤 Announcement Updated

"Limited Time Sale - 40% OFF!"

Updated at 2/14/2026, 3:47 PM
```

## Admin Panel Features

### Update Prices
- **Admin Role**: Change any price freely
- **Pricer Role**: Change prices with auto-discount rules (33% off non-religious items)

### Update Announcement
- Global announcement bar visible on every page
- Changes appear instantly after save

### Update USD Rate
- Controls the shop USD prices
- Automatically calculated from Turkish Lira rate

### Reset to Defaults
- Restores all prices to original seed data
- Also sends Discord notification

## How to Use

### Login
1. Go to `https://yourdomain.com/admin` (or `http://localhost:3000/admin`)
2. Select role: **Admin** or **Pricer**
3. Enter the key:
   - **Admin**: `LILPEEPLOVER123123`
   - **Pricer**: `DUDU123DUDU`

### Edit Prices
1. Click on any price in the table
2. Update the value
3. Click **Save** at the bottom
4. ✅ Watch Discord for instant notification!
5. Changes go live on Vercel within 2 minutes

### Edit Announcement
1. Find the "Announcement Text" field at the top
2. Update the text
3. Click **Save**
4. 🎤 Discord notified immediately!

### Edit USD Rate
1. Find "USD Rate" field
2. Update the exchange rate
3. Click **Save**

### Reset Everything
- Click **Reset to Defaults** button
- Restores seed prices
- Discord notified

## Real-Time Sync

✅ **Local Updates**: Save instantly in admin panel  
✅ **File Storage**: store-data.json updated immediately  
✅ **GitHub Sync**: Auto-committed within seconds  
✅ **Discord Alert**: Webhook fires right away  
✅ **Vercel Deploy**: Global update within 1-2 minutes  
✅ **Persistence**: Changes survive server restarts  

## Behind the Scenes

### What Each Role Can Do

**Admin Role:**
- ✅ Update all prices
- ✅ Update announcement
- ✅ Update USD rate
- ✅ Reset everything

**Pricer Role:**
- ✅ Update prices only (with auto-discount rules)
- ❌ Cannot change announcements
- ❌ Cannot change USD rate
- ❌ Cannot reset

### Pricing Rules

When the **Pricer role** saves prices:
- **Christian/Cross items**: NO discount applied
- **All other items**: Automatically gets **33% discount**

Example: If pricer sets price to 1500 TRY:
- Christian items: 1500 TRY (unchanged)
- Other items: 1005 TRY (67% of 1500)

## Discord Webhook Details

Your webhook URL is configured in `.env.local`:

```env
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
```

When price updates occur, messages include:
- **Color coding**: Blue for prices, Yellow for announcements
- **Embeds**: Rich formatting with product names and prices
- **Timestamps**: Exact time of update
- **Field organization**: Up to 24 products per message

## GitHub Actions Automation

The workflow `.github/workflows/vercel-redeploy.yml` automatically:
1. Detects when `store-data.json` changes
2. Triggers Vercel redeploy
3. Your site updates globally within minutes

## Testing Locally

```bash
npm run dev
```

Then test via Admin Panel:
1. Update a price
2. Watch terminal for: "✅ Sent Discord notification"
3. Check Discord server for the message!

## Troubleshooting

### "Discord notification didn't send"
- Check that `DISCORD_WEBHOOK_URL` is in `.env.local`
- Webhook URL must be valid and not expired
- Server needs internet connection

### "Changes don't appear on live site"
- Check Vercel deployment status (should auto-deploy within 2 min)
- Clear browser cache
- Verify commit was pushed to GitHub

### "Price saves but Discord doesn't notify"
- Check server logs for errors
- Rebuild locally: `npm run build`
- Ensure webhook URL is correct

## File Structure

```
store-data.json          ← Your current prices & settings
.env.local              ← Contains DISCORD_WEBHOOK_URL
.github/workflows/      ← Auto-redeploy workflow
lib/edgeStore.ts        ← Handles saves & Discord notifications
app/admin/panel/page.tsx ← Admin UI
```

## Security Tips

✅ Never share your Discord webhook URL  
✅ Regenerate webhook if compromised  
✅ Keep admin keys secret  
✅ Use strong ADMIN_KEY & PRICER_KEY  

---

**Everything is now fully interactive!** Your partner can update prices on Vercel live, and Discord will keep you both in the loop instantly! 🚀

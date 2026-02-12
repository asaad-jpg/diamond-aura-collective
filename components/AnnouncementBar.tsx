"use client";

import { useEffect, useMemo, useState } from "react";
import { loadConfig, defaultConfig } from "@/lib/devStore";

export default function AnnouncementBar() {
  const [text, setText] = useState<string>(defaultConfig.announcement);

  useEffect(() => {
    const cfg = loadConfig();
    setText(cfg.announcement);
  }, []);

  const line = useMemo(() => `${text}  •  ${text}  •  ${text}`, [text]);

  return (
    <div className="w-full bg-white border-b border-black/10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <div className="relative whitespace-nowrap">
          <div className="inline-block animate-marquee text-xs tracking-widest text-black font-medium">
            {line}
          </div>
        </div>
      </div>
    </div>
  );
}

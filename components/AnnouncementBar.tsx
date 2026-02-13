"use client";

import { useMemo } from "react";
import { useStoreData } from "@/lib/useStoreData";

export default function AnnouncementBar() {
  const { state } = useStoreData();
  const text = state.config.announcement;

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

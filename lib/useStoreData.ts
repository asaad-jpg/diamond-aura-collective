"use client";

import { useEffect, useState } from "react";
import type { StoreState } from "@/lib/storeSeed";
import { seedState } from "@/lib/storeSeed";

export function useStoreData() {
  const [state, setState] = useState<StoreState>(seedState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/store");
        if (!res.ok) throw new Error("Failed to fetch store data");
        const data = (await res.json()) as StoreState;
        setState(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setState(seedState);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { state, loading, error };
}

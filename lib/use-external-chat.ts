"use client";

import { useEffect } from "react";

export function useExternalChat(url?: string) {
  useEffect(() => {
    if (!url) {
      return;
    }
    window.location.assign(url);
  }, [url]);
}

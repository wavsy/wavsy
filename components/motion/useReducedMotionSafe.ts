"use client";

import { useEffect, useState } from "react";

// motion's useReducedMotion answers on the very first client render, while the
// server always rendered the moving version. When the two differ, React throws
// a hydration error. This hook matches the server on the first render and
// only switches after mount.
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduce;
}

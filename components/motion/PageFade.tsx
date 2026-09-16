"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

export function PageFade({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  // The first page is shown as the server sent it. Starting it at opacity 0
  // hid everything until JavaScript loaded, about 3 s on mobile, and held
  // back Largest Contentful Paint. The fade stays for later navigations.
  const firstPath = useRef(pathname);
  const fade = !reduce && pathname !== firstPath.current;

  return (
    <motion.div
      key={pathname}
      initial={fade ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

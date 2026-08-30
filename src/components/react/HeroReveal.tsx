import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { MotionProvider } from "./MotionProvider";

export function HeroReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <MotionProvider>
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: reduce ? undefined : 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionProvider>
  );
}

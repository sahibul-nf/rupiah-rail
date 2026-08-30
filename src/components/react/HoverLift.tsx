import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { MotionProvider } from "./MotionProvider";

type Props = {
  children: ReactNode;
  className?: string;
};

export function HoverLift({ children, className }: Props) {
  const reduce = useReducedMotion();

  return (
    <MotionProvider>
      <motion.div
        className={className}
        whileHover={
          reduce
            ? undefined
            : { y: -2, transition: { duration: 0.18, ease: "easeOut" } }
        }
      >
        {children}
      </motion.div>
    </MotionProvider>
  );
}

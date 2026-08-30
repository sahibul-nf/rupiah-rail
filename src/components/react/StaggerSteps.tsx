import { motion, useReducedMotion } from "motion/react";
import { MotionProvider } from "./MotionProvider";

type Step = {
  number: string;
  title: string;
  body: string;
};

type Props = {
  steps: readonly Step[];
  footnote: string;
};

export function StaggerSteps({ steps, footnote }: Props) {
  const reduce = useReducedMotion();

  return (
    <MotionProvider>
      <div>
        <motion.ol
          className="rail"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduce ? 0 : 0.08,
              },
            },
          }}
        >
          {steps.map((step) => (
            <motion.li
              key={step.number}
              className="rail-item"
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 10 },
                show: {
                  opacity: 1,
                  y: reduce ? undefined : 0,
                  transition: {
                    duration: 0.36,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <div className="rail-node">
                <span className="rail-num">{step.number}</span>
                <span className="rail-line" aria-hidden="true" />
              </div>
              <div className="rail-body">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
        <p className="mt-10 max-w-3xl text-sm text-ink-muted">{footnote}</p>
      </div>
    </MotionProvider>
  );
}

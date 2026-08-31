import { motion } from "motion/react";
import { SpotlightCard } from "./SpotlightCard";
import { MotionProvider } from "./MotionProvider";

const PRINCIPLES = [
  {
    icon: "💎",
    badge: "TRANSPARENCY",
    title: "Transparent Net Amount",
    desc: "Explore showing the expected final Rupiah amount upfront, reducing hidden markups and unexpected deductions.",
    colSpan: "lg:col-span-7",
    spotlight: "rgba(16, 185, 129, 0.15)",
    preview: (
      <div className="mt-5 flex items-center justify-between rounded-full bg-emerald-50/70 border border-emerald-200/60 px-4 py-2.5 text-xs font-mono">
        <span className="text-slate-600">Illustrative: 100 USDT</span>
        <span className="font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          ➔ Estimated Rp 1,630,095
        </span>
      </div>
    ),
  },
  {
    icon: "⚡",
    badge: "VELOCITY",
    title: "Repeatable Payouts",
    desc: "Explore saving beneficiary details securely, eliminating error-prone manual account entries on recurring withdrawals.",
    colSpan: "lg:col-span-5",
    spotlight: "rgba(6, 182, 212, 0.15)",
    preview: (
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-slate-700 whitespace-nowrap shadow-xs">
          Sample: BCA (8821)
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-slate-700 whitespace-nowrap shadow-xs">
          Sample: Mandiri (3940)
        </span>
      </div>
    ),
  },
  {
    icon: "🔐",
    badge: "SECURITY",
    title: "Self-Custody First",
    desc: "Explore flows where users retain sovereign custody of funds until they authorize a settlement transaction.",
    colSpan: "lg:col-span-5",
    spotlight: "rgba(99, 102, 241, 0.15)",
    preview: (
      <div className="mt-5 flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs text-slate-600">
        <span className="text-base">🛡️</span>
        <span>Non-custodial research architecture.</span>
      </div>
    ),
  },
  {
    icon: "🏛️",
    badge: "COMPLIANCE",
    title: "Partner-Led Compliance",
    desc: "Any exchange and fiat settlement would be delivered exclusively by properly licensed third-party financial providers.",
    colSpan: "lg:col-span-7",
    spotlight: "rgba(16, 185, 129, 0.15)",
    preview: (
      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-slate-700">
        <div className="rounded-full bg-slate-50 border border-slate-200 py-2 px-3">
          Third-Party Licensed Rails
        </div>
        <div className="rounded-full bg-slate-50 border border-slate-200 py-2 px-3">
          Compliance & AML Alignment
        </div>
      </div>
    ),
  },
];

export function BentoPrinciples() {
  return (
    <MotionProvider>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {PRINCIPLES.map((item, idx) => (
          <motion.div
            key={item.title}
            className={item.colSpan}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
          >
            <SpotlightCard spotlightColor={item.spotlight} className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>

              {item.preview}
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </MotionProvider>
  );
}

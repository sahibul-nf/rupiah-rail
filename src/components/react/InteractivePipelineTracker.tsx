import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MotionProvider } from "./MotionProvider";

const PIPELINE_STEPS = [
  {
    id: 1,
    number: "01",
    tag: "BENEFICIARY",
    title: "Choose Saved Bank Destination",
    shortDesc: "Explore reusing a saved beneficiary profile without re-typing account numbers.",
    fullDesc:
      "Explore selecting a saved Indonesian bank account profile (illustrative: BCA, Mandiri, BRI, Bank Jago, SeaBank) with fewer clicks. Conceptual flow aims to reduce repetitive manual data entry.",
    actionDemo: {
      type: "bank",
      selected: "Sample Bank A — John Doe (•••• 8821)",
      options: [
        { name: "Sample Bank A (BCA)", acc: "•••• 8821", owner: "John Doe (Sample)" },
        { name: "Sample Bank B (Mandiri)", acc: "•••• 3940", owner: "John Doe (Sample)" },
        { name: "Sample Bank C (Jago)", acc: "•••• 1029", owner: "John Doe (Sample)" },
      ],
    },
  },
  {
    id: 2,
    number: "02",
    tag: "QUOTE & RATE",
    title: "Review Indicative Net-IDR Quote",
    shortDesc: "Review full breakdown: stablecoin, illustrative FX rate, estimated fees, and net IDR.",
    fullDesc:
      "Review a transparent settlement breakdown before authorizing. Explore viewing the illustrative FX rate, network fees, and estimated net Rupiah delivered to your bank destination.",
    actionDemo: {
      type: "quote",
      usdt: "100 USDT (Illustrative)",
      rate: "1 USDT ≈ Rp 16,350",
      fee: "Illustrative fee breakdown",
      net: "Rp 1,630,095 (Sample)",
    },
  },
  {
    id: 3,
    number: "03",
    tag: "SETTLEMENT",
    title: "Authorization & Settlement Tracking",
    shortDesc: "Follow a trackable conceptual path from authorization through to bank destination.",
    fullDesc:
      "Explore authorizing settlement from a self-custody wallet through potential third-party licensed providers, with clear milestone notifications until funds reach the beneficiary.",
    actionDemo: {
      type: "status",
      stages: [
        { label: "Wallet Authorization (Conceptual)", status: "completed", time: "Step 1" },
        { label: "Settlement Processing (Third-party rail)", status: "completed", time: "Step 2" },
        { label: "Bank Network Payout (Local rail)", status: "completed", time: "Step 3" },
        { label: "Funds Credited to Destination", status: "completed", time: "Step 4" },
      ],
    },
  },
];

export function InteractivePipelineTracker() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentStepData = PIPELINE_STEPS.find((s) => s.id === activeStep) || PIPELINE_STEPS[0];

  return (
    <MotionProvider>
      <div className="w-full">
        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PIPELINE_STEPS.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setActiveStep(step.id);
                  setIsAutoPlaying(false);
                }}
                className={`text-left p-6 rounded-[1.75rem] border transition-all relative overflow-hidden ${
                  isActive
                    ? "bg-white border-emerald-500/80 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-500/20"
                    : "bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${
                      isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    STEP {step.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {step.tag}
                  </span>
                </div>
                <h3 className="mt-3.5 text-base font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {step.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Conceptual Interactive Preview Box */}
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step Explanation (Left) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Concept Stage: {currentStepData.tag}
              </div>

              <h4 className="text-2xl font-bold text-slate-900 leading-tight">
                {currentStepData.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentStepData.fullDesc}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                    isAutoPlaying
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {isAutoPlaying ? "❚❚ Pause Auto Tour" : "▶ Play Conceptual Tour"}
                </button>
                <span className="text-xs text-slate-400 font-mono">Step {activeStep} of 3</span>
              </div>
            </div>

            {/* Conceptual Simulation Widget (Right) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[1.5rem] border border-slate-200/90 bg-slate-900 text-slate-100 p-5 sm:p-6 shadow-xl"
                >
                  {/* Step 1 Demo: Bank Selection */}
                  {activeStep === 1 && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Illustrative Saved Beneficiary
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          ● Conceptual Flow
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        {currentStepData.actionDemo.options?.map((opt, i) => (
                          <div
                            key={opt.name}
                            className={`flex items-center justify-between p-3.5 rounded-[1rem] border transition-all cursor-pointer ${
                              i === 0
                                ? "bg-emerald-950/50 border-emerald-500/60 text-white ring-1 ring-emerald-500/30"
                                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
                                {opt.name.slice(0, 3).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-100">{opt.name}</div>
                                <div className="text-[11px] font-mono text-slate-400">
                                  {opt.owner} • {opt.acc}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                              <span>Sample profile</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2 Demo: Quote Confirmation */}
                  {activeStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Indicative Net-IDR Quote (Conceptual)
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400">
                          Illustrative rate model
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-800/70 p-3.5 rounded-[1rem] border border-slate-700/60">
                          <span className="text-slate-400 block text-[11px]">Simulated Amount</span>
                          <span className="text-sm font-bold font-mono text-white">100.00 USDT</span>
                        </div>
                        <div className="bg-slate-800/70 p-3.5 rounded-[1rem] border border-slate-700/60">
                          <span className="text-slate-400 block text-[11px]">Indicative FX Rate</span>
                          <span className="text-sm font-bold font-mono text-white">1 USDT ≈ Rp 16,350</span>
                        </div>
                      </div>
                      <div className="bg-slate-800/40 p-3.5 rounded-[1rem] border border-slate-800 space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Network Gas (Illustrative)</span>
                          <span className="font-mono text-emerald-400">~$0.15</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Settlement Fee (Illustrative model)</span>
                          <span className="font-mono text-emerald-400">0.30% ($0.30)</span>
                        </div>
                        <div className="flex justify-between font-semibold text-white pt-2 border-t border-slate-800">
                          <span className="text-emerald-400">Estimated Net Rupiah</span>
                          <span className="font-mono text-base text-emerald-400 font-bold">Rp 1,630,095</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 Demo: Conceptual Tracker */}
                  {activeStep === 3 && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Settlement Path Simulation
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400">
                          ● Illustrative Tracking Flow
                        </span>
                      </div>
                      <div className="space-y-2">
                        {currentStepData.actionDemo.stages?.map((stg) => (
                          <div
                            key={stg.label}
                            className="flex items-center justify-between p-3 rounded-[0.875rem] bg-slate-800/70 border border-slate-700/60 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                ✓
                              </span>
                              <span className="font-medium text-slate-200">{stg.label}</span>
                            </div>
                            <span className="font-mono text-[11px] text-slate-400">{stg.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-4 text-center text-xs text-slate-400">
          Illustrative only — research concept. Settlement partners, supported assets, networks, coverage, compliance requirements, and pricing are subject to validation.
        </p>
      </div>
    </MotionProvider>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MotionProvider } from "./MotionProvider";

const PIPELINE_STEPS = [
  {
    id: 1,
    number: "01",
    tag: "BENEFICIARY",
    title: "Choose Saved Bank Destination",
    shortDesc: "Reuse a verified Indonesian beneficiary without re-typing account numbers.",
    fullDesc:
      "Select your verified Indonesian bank account (BCA, Mandiri, BRI, Bank Jago, SeaBank) in one click. No copy-pasting numbers or anxiety over mistyped routing codes.",
    actionDemo: {
      type: "bank",
      selected: "BCA — John Doe (•••• 8821)",
      verified: true,
      options: [
        { name: "BCA", acc: "•••• 8821", owner: "John Doe", verified: true },
        { name: "Bank Mandiri", acc: "•••• 3940", owner: "John Doe", verified: true },
        { name: "Bank Jago", acc: "•••• 1029", owner: "John Doe", verified: true },
      ],
    },
  },
  {
    id: 2,
    number: "02",
    tag: "QUOTE & RATE",
    title: "Review Guaranteed Net-IDR Quote",
    shortDesc: "Lock in full breakdown: stablecoin, live FX rate, partner fees, and final IDR.",
    fullDesc:
      "Review the transparent settlement quote before you commit funds. See the exact rate, gas fee, and final Rupiah amount delivered straight to your local bank account.",
    actionDemo: {
      type: "quote",
      usdt: "100 USDT",
      rate: "1 USDT = Rp 16,350",
      fee: "0.3% ($0.30)",
      net: "Rp 1,630,095",
    },
  },
  {
    id: 3,
    number: "03",
    tag: "SETTLEMENT",
    title: "1-Click Authorization & Real-Time Tracking",
    shortDesc: "Follow a verified on-chain to local fiat settlement with real-time status updates.",
    fullDesc:
      "Authorize transfer from your self-custody wallet (MetaMask, Phantom, WalletConnect, etc.). The transaction routes via licensed settlement partners with sub-minute bank notification.",
    actionDemo: {
      type: "status",
      stages: [
        { label: "Wallet Authorized", status: "completed", time: "0s" },
        { label: "On-Chain Settlement", status: "completed", time: "12s" },
        { label: "Bank Network Payout (BI-FAST)", status: "completed", time: "34s" },
        { label: "Funds Credited to Beneficiary", status: "completed", time: "41s" },
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
                className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden ${
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
                    className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
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
                <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {step.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Preview Box */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step Explanation (Left) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Stage: {currentStepData.tag}
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
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition ${
                    isAutoPlaying
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {isAutoPlaying ? "❚❚ Pause Auto Tour" : "▶ Play Interactive Tour"}
                </button>
                <span className="text-xs text-slate-400">Step {activeStep} of 3</span>
              </div>
            </div>

            {/* Interactive Simulation Widget (Right) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-slate-200/90 bg-slate-900 text-slate-100 p-5 sm:p-6 shadow-xl"
                >
                  {/* Step 1 Demo: Bank Selection */}
                  {activeStep === 1 && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Select Verified Beneficiary
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          ● Instant Payout Ready
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        {currentStepData.actionDemo.options?.map((opt, i) => (
                          <div
                            key={opt.name}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                              i === 0
                                ? "bg-emerald-950/50 border-emerald-500/60 text-white ring-1 ring-emerald-500/30"
                                : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
                                {opt.name.slice(0, 3).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-100">{opt.name}</div>
                                <div className="text-[11px] font-mono text-slate-400">
                                  {opt.owner} • {opt.acc}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                              <span>✓ Verified</span>
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
                          Transparent Net Quote Breakdown
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400">
                          Guaranteed Rate Lock (60s)
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                          <span className="text-slate-400 block text-[11px]">Send Amount</span>
                          <span className="text-sm font-bold font-mono text-white">100.00 USDT</span>
                        </div>
                        <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                          <span className="text-slate-400 block text-[11px]">Indicative Rate</span>
                          <span className="text-sm font-bold font-mono text-white">1 USDT = Rp 16,350</span>
                        </div>
                      </div>
                      <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Network Gas (Base/Polygon)</span>
                          <span className="font-mono text-emerald-400">~$0.15</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Platform & Partner Settlement</span>
                          <span className="font-mono text-emerald-400">0.30% ($0.30)</span>
                        </div>
                        <div className="flex justify-between font-semibold text-white pt-2 border-t border-slate-800">
                          <span className="text-emerald-400">Net Rupiah Received</span>
                          <span className="font-mono text-base text-emerald-400 font-bold">Rp 1,630,095</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 Demo: Real-Time Tracker */}
                  {activeStep === 3 && (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Live Settlement Tracker (Simulation)
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 animate-pulse">
                          ● COMPLETED (41s)
                        </span>
                      </div>
                      <div className="space-y-2">
                        {currentStepData.actionDemo.stages?.map((stg, idx) => (
                          <div
                            key={stg.label}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                ✓
                              </span>
                              <span className="font-medium text-slate-200">{stg.label}</span>
                            </div>
                            <span className="font-mono text-[11px] text-slate-400">+{stg.time}</span>
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
          Settlement partners, supported assets, networks, coverage, compliance requirements, and pricing are subject to validation.
        </p>
      </div>
    </MotionProvider>
  );
}

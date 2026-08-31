import { useState } from "react";
import { MotionProvider } from "./MotionProvider";

const COMPARISON_DATA = {
  traditional: {
    title: "The Current Multi-Hop Detour",
    badge: "5 Steps • ~15-45 mins • Hidden FX & WD Fees",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    steps: [
      {
        step: 1,
        title: "Bridge / Multi-Wallet Hop",
        desc: "Transfer tokens across non-native chains, paying network bridge gas & waiting for confirmations.",
        icon: "⛓️",
      },
      {
        step: 2,
        title: "Deposit into Centralized Exchange (CEX)",
        desc: "Wait for 20-30 block confirmations on exchange deposit addresses with risk of freeze.",
        icon: "🏦",
      },
      {
        step: 3,
        title: "Order Book Trade (USDT -> IDR)",
        desc: "Execute spot market trades with maker/taker slippage, spread loss, and market volatility.",
        icon: "📉",
      },
      {
        step: 4,
        title: "Re-Enter Indonesian Bank Details",
        desc: "Manually fill 10-16 digit bank numbers and beneficiary names with zero error tolerance.",
        icon: "⌨️",
      },
      {
        step: 5,
        title: "CEX Fiat Withdrawal & Unknown Net IDR",
        desc: "Fixed fiat WD fee deducted from payout. Final landing amount is rarely clear upfront.",
        icon: "❓",
      },
    ],
  },
  rupiahRail: {
    title: "The Rupiah Rail Direct Route",
    badge: "1-Click Direct • Sub-minute Intent • Guaranteed Net IDR",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    steps: [
      {
        step: 1,
        title: "Select Saved Beneficiary",
        desc: "Choose your verified Indonesian bank account from your secure saved profiles with one tap.",
        icon: "✨",
      },
      {
        step: 2,
        title: "Transparent Net IDR Lock",
        desc: "See the exact rupiah you will receive in your bank account with zero hidden spreads.",
        icon: "🔒",
      },
      {
        step: 3,
        title: "Single Authorization & Settlement",
        desc: "Authorize from your self-custody wallet directly to licensed payout rails. Settled instantly.",
        icon: "🚀",
      },
    ],
  },
};

export function InteractiveProblemComparison() {
  const [activeTab, setActiveTab] = useState<"comparison" | "traditional" | "rupiahRail">("comparison");

  return (
    <MotionProvider>
      <div className="w-full">
        {/* Toggle Controls (Full Rounded Pill Group) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-slate-200/90 bg-white/90 p-1.5 shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab("comparison")}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "comparison"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("traditional")}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "traditional"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              The Old Detour (5 Steps)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("rupiahRail")}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "rupiahRail"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Rupiah Rail Way (Direct)
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Card */}
          {(activeTab === "comparison" || activeTab === "traditional") && (
            <div
              className={`rounded-[1.75rem] border border-rose-200/80 bg-gradient-to-b from-rose-50/40 via-white to-white p-6 sm:p-8 shadow-xs transition-all duration-300 ${
                activeTab === "traditional" ? "lg:col-span-2 max-w-2xl mx-auto w-full" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-rose-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xs font-bold">
                      ✕
                    </span>
                    {COMPARISON_DATA.traditional.title}
                  </h3>
                  <p className="mt-1 text-xs text-rose-600 font-medium">
                    {COMPARISON_DATA.traditional.badge}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {COMPARISON_DATA.traditional.steps.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-base">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <span>{item.step}. {item.title}</span>
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rupiah Rail Card */}
          {(activeTab === "comparison" || activeTab === "rupiahRail") && (
            <div
              className={`relative overflow-hidden rounded-[1.75rem] border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-50/50 via-white to-white p-6 sm:p-8 shadow-xl shadow-emerald-900/5 transition-all duration-300 ${
                activeTab === "rupiahRail" ? "lg:col-span-2 max-w-2xl mx-auto w-full" : ""
              }`}
            >
              {/* Highlight ribbon (Full Rounded Pill) */}
              <div className="absolute top-4 right-4 bg-gradient-to-l from-emerald-600 to-teal-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-xs">
                RECOMMENDED FLOW
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-emerald-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                      ✓
                    </span>
                    {COMPARISON_DATA.rupiahRail.title}
                  </h3>
                  <p className="mt-1 text-xs text-emerald-700 font-medium">
                    {COMPARISON_DATA.rupiahRail.badge}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {COMPARISON_DATA.rupiahRail.steps.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 rounded-[1.25rem] border border-emerald-100/80 bg-gradient-to-r from-emerald-50/60 to-white p-4 shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-lg text-emerald-700">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{item.step}. {item.title}</span>
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Benefit Highlights */}
              <div className="mt-6 rounded-[1.25rem] border border-emerald-200/60 bg-emerald-900 text-white p-4.5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-base font-extrabold text-emerald-300 font-mono">0</div>
                    <div className="text-[11px] text-emerald-100/80">CEX Required</div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-emerald-300 font-mono">100%</div>
                    <div className="text-[11px] text-emerald-100/80">Self-Custody</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-base font-extrabold text-emerald-300 font-mono">Instant</div>
                    <div className="text-[11px] text-emerald-100/80">IDR Settlement</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MotionProvider>
  );
}

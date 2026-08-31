import { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MotionProvider } from "./MotionProvider";

const PRESET_AMOUNTS = [50, 100, 250, 500, 1000];
const NETWORKS = [
  { id: "polygon", name: "Polygon", icon: "⬡", fee: 0.15 },
  { id: "arbitrum", name: "Arbitrum", icon: "▲", fee: 0.2 },
  { id: "base", name: "Base", icon: "🔵", fee: 0.1 },
  { id: "solana", name: "Solana", icon: "◎", fee: 0.05 },
];

const BANKS = [
  { id: "bca", name: "Bank Central Asia (BCA)", account: "•••• 8821", color: "bg-blue-600" },
  { id: "mandiri", name: "Bank Mandiri", account: "•••• 3940", color: "bg-amber-600" },
  { id: "jago", name: "Bank Jago", account: "•••• 1029", color: "bg-yellow-500" },
  { id: "bri", name: "Bank BRI", account: "•••• 6542", color: "bg-blue-800" },
];

// Indicative base rate (e.g. 1 USDT ≈ Rp 16,350)
const ILLUSTRATIVE_RATE = 16350;
const PLATFORM_FEE_PERCENT = 0.003; // 0.3%

export function InteractiveQuoteCalculator() {
  const [amount, setAmount] = useState<number>(100);
  const [asset, setAsset] = useState<"USDT" | "USDC">("USDT");
  const [network, setNetwork] = useState(NETWORKS[0]);
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);
  const [isCopied, setIsCopied] = useState(false);
  const sliderId = useId();

  // Calculations
  const networkFeeUsd = network.fee;
  const platformFeeUsd = amount * PLATFORM_FEE_PERCENT;
  const totalFeeUsd = networkFeeUsd + platformFeeUsd;
  const netUsd = Math.max(0, amount - totalFeeUsd);
  const netIdr = Math.round(netUsd * ILLUSTRATIVE_RATE);

  const formattedNetIdr = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(netIdr);

  const handleCopySummary = () => {
    const summary = `Rupiah Rail Quote Simulation: ${amount} ${asset} (${network.name}) -> ${selectedBank.name} | Estimated Net: ${formattedNetIdr}`;
    navigator.clipboard?.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <MotionProvider>
      <div className="relative mx-auto w-full max-w-lg">
        {/* Glow ambient background behind the card */}
        <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10" />

        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-7 shadow-2xl shadow-slate-900/10">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Interactive Quote Simulator
              </span>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-700 border border-emerald-200/70">
              Live Preview
            </span>
          </div>

          {/* Amount & Asset Selector */}
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>YOU SEND</span>
                <div className="flex rounded-lg bg-slate-200/70 p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setAsset("USDT")}
                    className={`rounded-md px-2.5 py-1 transition-all ${
                      asset === "USDT"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    USDT
                  </button>
                  <button
                    type="button"
                    onClick={() => setAsset("USDC")}
                    className={`rounded-md px-2.5 py-1 transition-all ${
                      asset === "USDC"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    USDC
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                    {amount}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">{asset}</span>
                </div>
                <span className="font-mono text-xs text-slate-500">
                  ≈ Rp {(amount * ILLUSTRATIVE_RATE).toLocaleString("id-ID")}
                </span>
              </div>

              {/* Slider Input */}
              <div className="mt-3">
                <label htmlFor={sliderId} className="sr-only">
                  Select stablecoin amount
                </label>
                <input
                  id={sliderId}
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Preset Chips */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {PRESET_AMOUNTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(p)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono font-medium transition-colors ${
                      amount === p
                        ? "bg-emerald-600 text-white font-semibold shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    ${p}
                  </button>
                ))}
              </div>
            </div>

            {/* Network & Bank Destination Quick Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Network */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Deposit Network
                </label>
                <div className="relative">
                  <select
                    value={network.id}
                    onChange={(e) => {
                      const found = NETWORKS.find((n) => n.id === e.target.value);
                      if (found) setNetwork(found);
                    }}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {NETWORKS.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.icon} {n.name} (~${n.fee} gas)
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Saved Beneficiary */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Saved Beneficiary
                </label>
                <div className="relative">
                  <select
                    value={selectedBank.id}
                    onChange={(e) => {
                      const found = BANKS.find((b) => b.id === e.target.value);
                      if (found) setSelectedBank(found);
                    }}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {BANKS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.account})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown Detail */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Indicative FX Rate</span>
                <span className="font-mono font-medium text-slate-900">
                  1 {asset} = Rp {ILLUSTRATIVE_RATE.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Network + Partner Fee</span>
                <span className="font-mono text-slate-700">
                  ${totalFeeUsd.toFixed(2)} {asset} (~Rp {Math.round(totalFeeUsd * ILLUSTRATIVE_RATE).toLocaleString("id-ID")})
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payout Destination</span>
                <span className="font-medium text-slate-800">
                  {selectedBank.name.split(" ")[0]} {selectedBank.account}
                </span>
              </div>
            </div>

            {/* Net Amount Highlight Box */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white p-4.5 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Net IDR In Your Bank
                  </span>
                  <p className="text-[11px] text-emerald-700/80">No surprises, what you see is what lands</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Zero Spread Markup
                </span>
              </div>

              <div className="mt-2.5 flex items-baseline justify-between gap-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={formattedNetIdr}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-950 tracking-tight"
                  >
                    {formattedNetIdr}
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="rounded-lg border border-emerald-300/80 bg-white/90 px-2.5 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-50 transition shadow-sm"
                  title="Copy quote breakdown"
                >
                  {isCopied ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
            <span>* Illustrative rate for research modeling</span>
            <span className="font-mono">Instant routing</span>
          </div>
        </div>
      </div>
    </MotionProvider>
  );
}

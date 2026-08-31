export const site = {
  name: "Rupiah Rail",
  tagline: "From stablecoins to your Indonesian bank account, without the detours.",
  description:
    "Rupiah Rail is exploring a clearer cash-out experience for freelancers and global earners: saved bank destinations, transparent net-IDR quotes, and reliable transaction tracking.",
  email: "developer.sahibulnf@gmail.com",
  founder: {
    name: "Sahibul Nuzul Firdaus",
    role: "Independent Founder, Rupiah Rail",
    email: "developer.sahibulnf@gmail.com",
  },
  affiliation:
    "Not affiliated with MiniPay, Celo, PEXX, Noah, or their respective affiliates.",
} as const;

export const nav = [
  { href: "/#problem", label: "Problem" },
  { href: "/#how", label: "How It Could Work" },
  { href: "/#principles", label: "Principles" },
  { href: "/#contact", label: "Contact" },
] as const;

export const header = {
  cta: "Start a conversation",
  ctaHref: "/#contact",
} as const;

export const hero = {
  eyebrow: "Early-stage settlement infrastructure research",
  headline: "A simpler path from stablecoins to Indonesian bank accounts.",
  supporting: site.description,
  primaryCta: "Discuss a partnership",
  primaryHref: "/#contact",
  secondaryCta: "Explore the concept",
  secondaryHref: "/#how",
} as const;

export const quoteCard = {
  kicker: "Conceptual quote",
  rows: [
    { label: "Send (illustrative)", value: "100 USDT" },
    { label: "Rate", value: "Illustrative only" },
    { label: "Fees", value: "Shown in quote" },
    { label: "Net IDR", value: "Rp 1,5xx,xxx", emphasize: true },
  ],
  label: "Illustrative only — research concept.",
} as const;

export const problem = {
  title: "The last mile is still too complicated.",
  cards: [
    {
      icon: "hops" as const,
      title: "Too many hops",
      body: "Moving funds across wallets, networks, exchanges, and payout platforms adds friction.",
    },
    {
      icon: "form" as const,
      title: "Repeat data entry",
      body: "The same Indonesian bank details are often entered again for each withdrawal.",
    },
    {
      icon: "quote" as const,
      title: "Unclear outcome",
      body: "Users may see fees but not the final net IDR they will receive.",
    },
  ],
} as const;

export const how = {
  title: "Designed around the outcome, not the rails.",
  steps: [
    {
      number: "1",
      title: "Choose a saved bank destination",
      body: "Explore reusing a saved beneficiary profile instead of re-entering account details for each cash-out.",
    },
    {
      number: "2",
      title: "Review an indicative net-IDR quote",
      body: "See illustrative stablecoin amounts, exchange rates, fee breakdowns, and estimated net IDR before confirming.",
    },
    {
      number: "3",
      title: "Confirm and track settlement",
      body: "Follow a trackable conceptual path from authorization through to the bank destination.",
    },
  ],
  footnote:
    "Settlement partners, supported assets, networks, coverage, compliance requirements, and pricing are subject to validation.",
} as const;

export const principles = {
  title: "What we are validating",
  items: [
    {
      icon: "quote" as const,
      title: "Transparent net amount",
      body: "Show the expected final IDR, not only a headline fee.",
    },
    {
      icon: "form" as const,
      title: "Repeatable payouts",
      body: "Save beneficiary details securely, once available through potential third-party licensed providers.",
    },
    {
      icon: "custody" as const,
      title: "Self-custody first",
      body: "Explore flows where users retain sovereign control until they authorize a transaction.",
    },
    {
      icon: "shield" as const,
      title: "Partner-led compliance",
      body: "Any future exchange and fiat settlement would be delivered exclusively by properly licensed third-party providers.",
    },
  ],
} as const;

export const disclaimer =
  "Rupiah Rail is a pre-launch product concept. It does not currently provide financial services, custody, exchange, remittance, investment advice, or live withdrawals. No partnership or integration is implied.";

export const contact = {
  title: "Building the right settlement path.",
  body: "We are speaking with licensed payout, stablecoin settlement, and wallet-infrastructure partners about technical feasibility for Indonesia.",
  cta: "Contact the project",
  note: "Partnership and technical-validation enquiries welcome.",
} as const;

export const footer = {
  copyright: "© 2026 Rupiah Rail. Early-stage concept.",
  privacy: "Privacy",
  terms: "Terms",
} as const;

export const privacy = {
  title: "Privacy",
  description: "How this website handles information.",
  paragraphs: [
    "This website is a static information page for an early-stage product concept.",
    "The website does not collect personal or financial information unless the visitor chooses to contact via email.",
    "There are no accounts, forms, analytics scripts, cookies for tracking, or wallet connections on this site.",
    `If you email ${site.email}, the contents of that message are handled only as a correspondence you initiated.`,
  ],
} as const;

export const terms = {
  title: "Terms",
  description: "This site describes a concept, not a live financial service.",
  paragraphs: [
    "Rupiah Rail is an early-stage, pre-incorporation research concept. This website does not offer a financial service and is not financial advice.",
    "Nothing on this site is an offer to exchange, remit, custody, invest, or withdraw funds. No live quotes, rates, licenses, integrations, or regulatory approvals are claimed.",
    "Illustrative figures, including sample net-IDR amounts, are hypothetical examples only and are not executable quotes.",
    disclaimer,
    site.affiliation,
  ],
} as const;

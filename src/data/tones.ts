export type Tone = {
  id: "quiet-math" | "open-secret" | "receipt";
  label: string;
  voice: string;
  references: string[];
  hero: string;
  sub: string;
  cta: string;
  trust: string;
  use: string;
};

export const TONES: Tone[] = [
  {
    id: "quiet-math",
    label: "The Quiet Math",
    voice: "Calm, factual, accountant-like. No exclamation marks. Numbers talk.",
    references: ["Wise", "Linear", "Stripe Atlas"],
    hero: "You paid $14,820 in fees last year. 62% of that should have been yours.",
    sub: "ReboundX returns the referrer commission that exchanges pay — to the person who actually traded. You.",
    cta: "See your number →",
    trust: "23,140 traders · $4.2M returned · audited monthly",
    use: "Primary landing, intermediate–advanced traders.",
  },
  {
    id: "open-secret",
    label: "The Open Secret",
    voice: "Conspiratorial-but-warm. Lowercase. Short sentences.",
    references: ["Cash App", "Robinhood (early)", "Notion launch"],
    hero: "the rebate every pro trader already takes.",
    sub: "exchanges pay 40–62% of your fees as a referral kickback. they just don't tell you. we do — and we send it back.",
    cta: "claim yours",
    trust: "your friends are already on it. probably.",
    use: "Viral / social channels, beginner acquisition.",
  },
  {
    id: "receipt",
    label: "The Receipt",
    voice: "Itemized, transparent, legal-precise. Tables over prose.",
    references: ["Mercury", "Ramp", "Plaid docs"],
    hero: "Your fees, itemized.",
    sub: "Every cent traceable. Every payout exportable. The exchange already pays the referrer. We make sure that's you.",
    cta: "Open my receipt →",
    trust: "Every cent traceable · CSV export for taxes",
    use: "Conversion / pricing page, high-volume traders.",
  },
];

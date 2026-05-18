import { SectionHeader } from "./SectionHeader";
import { Rule } from "../primitives/Rule";

type Step = {
  num: string;
  title: string;
  body: string;
  meta: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Sign in.",
    body: "Google, Apple, or magic link. 30 seconds. Wallet comes later — this is just so we know where to send rebates.",
    meta: "30s",
  },
  {
    num: "02",
    title: "Open exchange through us.",
    body: "Pick the exchange that fits your style. We open it in a new tab with the referral applied. UIDs can't switch referrers later — this step is the one that matters.",
    meta: "90s",
  },
  {
    num: "03",
    title: "Paste your UID.",
    body: "Copy the number from your exchange profile, paste it here. We'll detect it from your clipboard automatically. Verification usually takes 6 minutes — keep going while we check.",
    meta: "45s",
  },
  {
    num: "04",
    title: "Connect a payout wallet.",
    body: "Just a receiving address. We never request signatures that move funds. Default network: TRC20 USDT — switch to ERC20 or SOL anytime.",
    meta: "30s",
  },
];

type Props = {
  onStart: () => void;
};

export function HowItWorks({ onStart }: Props) {
  return (
    <section
      id="how"
      className="container pt-[var(--s-24)] scroll-mt-[80px]"
      aria-labelledby="how-heading"
    >
      <SectionHeader
        eyebrow="How it works"
        title={
          <>
            Four steps. <span className="text-[var(--ink-muted)]">About three minutes.</span>
          </>
        }
        description="Everything happens in one tab. We detect when you return from the exchange and advance automatically."
      />

      <div
        id="how-heading"
        className="sr-only"
      >
        How ReboundX works
      </div>

      <ol className="mt-[var(--s-12)]">
        <Rule />
        {STEPS.map((step) => (
          <li key={step.num}>
            <div className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[80px_1fr_120px] gap-[var(--s-4)] md:gap-[var(--s-8)] py-[var(--s-6)] md:py-[var(--s-8)] items-baseline">
              <span className="mono text-[14px] text-[var(--ink-subtle)]">
                {step.num}
              </span>
              <div className="flex flex-col gap-[var(--s-2)] max-w-[60ch]">
                <h3 className="t-h2">{step.title}</h3>
                <p className="t-body text-[var(--ink-muted)]">{step.body}</p>
              </div>
              <span className="mono text-[13px] text-[var(--ink-muted)] justify-self-end">
                {step.meta}
              </span>
            </div>
            <Rule />
          </li>
        ))}
      </ol>

      <div className="mt-[var(--s-8)]">
        <button
          onClick={onStart}
          className="group inline-flex items-baseline gap-[10px] text-[16px] font-medium hover:text-[var(--accent)] transition-colors"
        >
          Start the four-step flow
          <span aria-hidden className="transition-transform group-hover:translate-x-[4px]">
            →
          </span>
        </button>
      </div>
    </section>
  );
}

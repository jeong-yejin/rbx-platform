import { Button } from "../primitives/Button";
import { Rule } from "../primitives/Rule";

type Props = {
  onComplete: () => void;
};

export function Step1SignIn({ onComplete }: Props) {
  return (
    <div className="flex flex-col gap-[var(--s-8)] max-w-[480px]">
      <div className="flex flex-col gap-[var(--s-3)]">
        <p className="t-micro text-[var(--ink-muted)]">Step 01 of 04</p>
        <h2 className="t-h1">First, save your spot.</h2>
        <p className="t-body text-[var(--ink-muted)]">
          We need 30 seconds to create your rebate account. Wallet comes later — this is just so we know where to send your rebates.
        </p>
      </div>

      <div className="flex flex-col gap-[var(--s-3)]">
        <Button
          variant="primary"
          size="lg"
          trailingArrow
          onClick={onComplete}
          className="justify-center w-full"
        >
          Continue with Google
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={onComplete}
          className="justify-center w-full border border-[var(--rule-strong)]"
        >
          Continue with Apple
        </Button>
        <Button
          variant="link"
          onClick={onComplete}
          className="justify-center w-full"
        >
          Email me a magic link
        </Button>
      </div>

      <Rule />

      <p className="t-small text-[var(--ink-muted)] max-w-[44ch]">
        We use sign-in only to identify your rebate account. We never request exchange credentials or wallet signatures here.
      </p>
    </div>
  );
}

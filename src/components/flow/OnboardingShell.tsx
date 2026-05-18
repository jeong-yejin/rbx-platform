import { useState } from "react";
import { StepProgress, type StepKey } from "./StepProgress";
import { Step1SignIn } from "./Step1SignIn";
import { Step2Exchange } from "./Step2Exchange";
import { Step3UID } from "./Step3UID";
import { Step4Wallet } from "./Step4Wallet";
import { Rule } from "../primitives/Rule";
import type { Exchange } from "../../data/exchanges";

type Props = {
  onFinished: (data: {
    exchange: Exchange;
    uid: string;
    address: string;
    network: string;
  }) => void;
  onExit: () => void;
};

export function OnboardingShell({ onFinished, onExit }: Props) {
  const [step, setStep] = useState<StepKey>(1);
  const [completed, setCompleted] = useState<Set<StepKey>>(new Set());
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [uid, setUid] = useState<string>("");

  const advance = (from: StepKey) => {
    setCompleted((prev) => new Set(prev).add(from));
    setStep((from + 1) as StepKey);
  };

  return (
    <section className="container pt-[var(--s-12)] pb-[var(--s-24)]">
      <div className="flex items-baseline justify-between mb-[var(--s-8)]">
        <div>
          <p className="t-micro text-[var(--ink-muted)]">Open your rebate account</p>
          <h1 className="t-h2 mt-[var(--s-1)]">About three minutes.</h1>
        </div>
        <button
          onClick={onExit}
          className="text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)]"
        >
          ← Back to landing
        </button>
      </div>

      <div className="grid gap-[var(--s-12)] md:grid-cols-[220px_1fr] md:gap-[var(--s-16)] items-start">
        <aside className="md:sticky md:top-[88px] order-2 md:order-1">
          <Rule />
          <div className="py-[var(--s-4)]">
            <StepProgress
              current={step}
              completed={completed}
              onJump={(target) => {
                if (completed.has(target) || target < step) setStep(target);
              }}
            />
          </div>
          <Rule />
          <p className="t-small text-[var(--ink-muted)] mt-[var(--s-4)] max-w-[26ch]">
            You can come back later. Your progress is saved against your account.
          </p>
        </aside>

        <div className="order-1 md:order-2 min-h-[420px]">
          {step === 1 && <Step1SignIn onComplete={() => advance(1)} />}
          {step === 2 && (
            <Step2Exchange
              selected={exchange}
              onSelect={setExchange}
              onComplete={() => exchange && advance(2)}
            />
          )}
          {step === 3 && (
            <Step3UID
              exchange={exchange}
              onComplete={(value) => {
                setUid(value);
                advance(3);
              }}
            />
          )}
          {step === 4 && (
            <Step4Wallet
              onComplete={(address, network) => {
                setCompleted((prev) => new Set(prev).add(4));
                if (exchange) {
                  onFinished({ exchange, uid, address, network });
                }
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

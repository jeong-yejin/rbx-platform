import { useEffect, useRef, useState } from "react";
import { Input } from "../primitives/Input";
import { Button } from "../primitives/Button";
import { Rule } from "../primitives/Rule";
import type { Exchange } from "../../data/exchanges";

type Props = {
  exchange: Exchange | null;
  onComplete: (uid: string) => void;
};

type VerifyState = "idle" | "verifying" | "ok" | "failed";

export function Step3UID({ exchange, onComplete }: Props) {
  const [uid, setUid] = useState("");
  const [state, setState] = useState<VerifyState>("idle");
  const [clipboardSuggestion, setClipboardSuggestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!exchange) return;
    if (typeof navigator === "undefined") return;
    if (!navigator.clipboard?.readText) return;

    const tryClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        const digits = text.trim();
        if (
          /^\d+$/.test(digits) &&
          digits.length >= exchange.uidLength.min &&
          digits.length <= exchange.uidLength.max
        ) {
          setClipboardSuggestion(digits);
        }
      } catch {
        // permission denied — silent, manual paste still works
      }
    };
    tryClipboard();
  }, [exchange]);

  const valid =
    exchange &&
    /^\d+$/.test(uid) &&
    uid.length >= exchange.uidLength.min &&
    uid.length <= exchange.uidLength.max;

  const submit = () => {
    if (!valid) return;
    setState("verifying");
    setTimeout(() => {
      setState("ok");
      setTimeout(() => onComplete(uid), 480);
    }, 1400);
  };

  if (!exchange) {
    return (
      <p className="t-body text-[var(--ink-muted)]">
        Pick an exchange first to know which UID to paste.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-[var(--s-8)] max-w-[540px]">
      <div className="flex flex-col gap-[var(--s-3)]">
        <p className="t-micro text-[var(--ink-muted)]">Step 03 of 04</p>
        <h2 className="t-h1">Paste your {exchange.name} UID.</h2>
        <p className="t-body text-[var(--ink-muted)]">
          It's the number on your exchange profile. Copy, paste, done. Verification usually takes 6 minutes — you can keep going while we check.
        </p>
      </div>

      <div className="flex items-end gap-[var(--s-4)]">
        <div className="flex-1">
          <Input
            ref={inputRef}
            label={`${exchange.name} UID`}
            placeholder={exchange.uidPlaceholder}
            mono
            value={uid}
            onChange={(e) =>
              setUid(e.target.value.replace(/[^0-9]/g, "").slice(0, 16))
            }
            inputMode="numeric"
            pattern="[0-9]*"
            helper={`${exchange.uidLength.min}–${exchange.uidLength.max} digits`}
            error={
              state === "failed"
                ? "We couldn't match this UID. Open a fresh exchange account through Step 2."
                : undefined
            }
          />
        </div>
        <Button
          onClick={submit}
          disabled={!valid || state === "verifying"}
          className="mb-[24px]"
        >
          {state === "verifying" ? "Verifying…" : state === "ok" ? "Matched ✓" : "Verify"}
        </Button>
      </div>

      {clipboardSuggestion && uid !== clipboardSuggestion && (
        <div className="border-t border-[var(--rule)] pt-[var(--s-4)]">
          <p className="t-small text-[var(--ink-muted)]">
            We detected <span className="mono text-[var(--ink)]">{clipboardSuggestion}</span> in your clipboard.
          </p>
          <div className="flex items-baseline gap-[var(--s-3)] mt-[var(--s-2)]">
            <button
              type="button"
              className="text-[14px] text-[var(--ink)] hover:text-[var(--accent)] underline underline-offset-[4px] decoration-[var(--rule-strong)]"
              onClick={() => {
                setUid(clipboardSuggestion);
                setClipboardSuggestion(null);
                inputRef.current?.focus();
              }}
            >
              Use this UID
            </button>
            <button
              type="button"
              className="text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)]"
              onClick={() => setClipboardSuggestion(null)}
            >
              No, I'll paste manually
            </button>
          </div>
        </div>
      )}

      <Rule />

      <details className="group">
        <summary className="cursor-pointer text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)] flex items-baseline gap-[var(--s-2)]">
          Where do I find my UID on {exchange.name}?
          <span aria-hidden className="transition-transform group-open:rotate-90">
            →
          </span>
        </summary>
        <ol className="mt-[var(--s-3)] grid gap-[var(--s-2)] text-[14px] text-[var(--ink-muted)] mono">
          <li>1. Open {exchange.name} → tap your profile.</li>
          <li>2. Tap "Account" or "Identification".</li>
          <li>3. Copy the {exchange.uidLength.min}–{exchange.uidLength.max} digit UID (not the email).</li>
          <li>4. Come back here and paste.</li>
        </ol>
      </details>
    </div>
  );
}

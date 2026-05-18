import { useState } from "react";
import { Input } from "../primitives/Input";
import { Button } from "../primitives/Button";
import { Rule } from "../primitives/Rule";
import { cn } from "../../lib/cn";

type Network = "TRC20" | "ERC20" | "SOL";

type Props = {
  onComplete: (address: string, network: Network) => void;
};

const NETWORKS: { id: Network; label: string; note: string }[] = [
  { id: "TRC20", label: "TRC20", note: "Lowest gas · default" },
  { id: "ERC20", label: "ERC20", note: "Mainnet · higher gas" },
  { id: "SOL", label: "Solana", note: "Fastest settlement" },
];

const PATTERNS: Record<Network, RegExp> = {
  TRC20: /^T[A-Za-z0-9]{33}$/,
  ERC20: /^0x[a-fA-F0-9]{40}$/,
  SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
};

export function Step4Wallet({ onComplete }: Props) {
  const [network, setNetwork] = useState<Network>("TRC20");
  const [address, setAddress] = useState("");
  const valid = PATTERNS[network].test(address.trim());

  return (
    <div className="flex flex-col gap-[var(--s-8)] max-w-[560px]">
      <div className="flex flex-col gap-[var(--s-3)]">
        <p className="t-micro text-[var(--ink-muted)]">Step 04 of 04</p>
        <h2 className="t-h1">Where should we send your rebates?</h2>
        <p className="t-body text-[var(--ink-muted)]">
          Just a receiving address. We never request signatures that move your funds.
        </p>
      </div>

      <Input
        label="Payout address"
        placeholder={network === "TRC20" ? "Tab9k…2nFx" : network === "ERC20" ? "0x9k…2nFx" : "Solana address"}
        mono
        value={address}
        onChange={(e) => setAddress(e.target.value.trim())}
        helper="Read-only. We send to it. We never sign anything that moves funds."
        error={
          address && !valid
            ? `That doesn't look like a valid ${network} address.`
            : undefined
        }
      />

      <div role="radiogroup" aria-label="Network" className="flex flex-col gap-[var(--s-3)]">
        <p className="t-micro text-[var(--ink-muted)]">Network</p>
        <div className="flex flex-wrap gap-[var(--s-6)]">
          {NETWORKS.map((n) => {
            const selected = network === n.id;
            return (
              <label
                key={n.id}
                className={cn(
                  "flex items-baseline gap-[var(--s-2)] cursor-pointer text-[15px] transition-colors",
                  selected ? "text-[var(--ink)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
                )}
              >
                <input
                  type="radio"
                  name="network"
                  value={n.id}
                  checked={selected}
                  onChange={() => setNetwork(n.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "inline-block w-[10px] h-[10px] rounded-full border transition-colors",
                    selected
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--rule-strong)]",
                  )}
                />
                {n.label}
                <span className="mono text-[12px] text-[var(--ink-subtle)] ml-[var(--s-2)]">
                  {n.note}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <Rule />

      <div className="flex flex-col gap-[var(--s-3)] text-[14px] text-[var(--ink-muted)]">
        <p>We send <span className="text-[var(--ink)]">to</span> this address. We never ask you to sign anything that <span className="text-[var(--ink)]">moves</span> funds.</p>
        <p>Minimum payout: $5. Anything below rolls into the next cycle.</p>
      </div>

      <div className="flex flex-wrap items-baseline gap-[var(--s-6)]">
        <Button
          size="lg"
          disabled={!valid}
          onClick={() => onComplete(address.trim(), network)}
          trailingArrow
        >
          Finish setup
        </Button>
        <Button variant="link" onClick={() => onComplete("Tab9k1xQ7nFxhA92pLm0VeRb3kS5xJqYz", "TRC20")}>
          Connect via WalletConnect
        </Button>
      </div>
    </div>
  );
}

import { SectionHeader } from "./SectionHeader";
import { Rule } from "../primitives/Rule";
import { EXCHANGES, type Exchange } from "../../data/exchanges";
import { cn } from "../../lib/cn";

type Props = {
  onStart: () => void;
};

const DASH = "—";

function fmtPct(n: number | null): string {
  if (n === null) return DASH;
  const sign = n < 0 ? "-" : "";
  const trimmed = Math.abs(n).toFixed(4).replace(/\.?0+$/, "");
  return `${sign}${trimmed}%`;
}

function fmtUSDT(n: number): string {
  if (n === 0) return "0 USDT";
  const fixed = n.toFixed(2).replace(/\.00$/, "");
  return `${Number(fixed).toLocaleString("en-US", {
    minimumFractionDigits: fixed.includes(".") ? 2 : 0,
    maximumFractionDigits: 2,
  })} USDT`;
}

function rebateLabel(e: Exchange): string {
  if (e.rebateLabel) return e.rebateLabel;
  if (e.rebateRate === null) return DASH;
  return `${e.rebateRate}%`;
}

export function Exchanges({ onStart }: Props) {
  return (
    <section
      id="exchanges"
      className="container pt-[var(--s-24)] scroll-mt-[80px]"
      aria-labelledby="exchanges-heading"
    >
      <SectionHeader
        eyebrow="Partner exchanges"
        title={
          <>
            Officially linked.{" "}
            <span className="text-[var(--ink-muted)]">
              Rebate paid by the exchange itself.
            </span>
          </>
        }
        description="Each integration is a direct commercial agreement, not an affiliate scrape. The percentage you see is what the exchange remits to us — and the number we send back to you."
      />
      <h3 id="exchanges-heading" className="sr-only">
        Partner exchanges
      </h3>

      <div className="mt-[var(--s-12)] overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse">
          <thead>
            <tr className="text-left">
              <th className="t-micro text-[var(--ink-muted)] font-normal py-[var(--s-3)] pr-[var(--s-4)] w-[220px]">
                Exchange
              </th>
              <th className="t-micro text-[var(--ink-muted)] font-normal py-[var(--s-3)] pr-[var(--s-4)] w-[100px]">
                Type
              </th>
              <th className="t-micro text-[var(--ink-muted)] font-normal py-[var(--s-3)] pr-[var(--s-4)]">
                Rebate
              </th>
              <th className="t-micro text-[var(--ink-muted)] font-normal py-[var(--s-3)] pr-[var(--s-4)]">
                Maker fee
              </th>
              <th className="t-micro text-[var(--ink-muted)] font-normal py-[var(--s-3)] pr-[var(--s-4)]">
                Taker fee
              </th>
              <th className="t-micro text-[var(--ink-muted)] font-normal py-[var(--s-3)] text-right">
                Avg rebate / user
              </th>
            </tr>
          </thead>
          <tbody>
            <tr aria-hidden>
              <td colSpan={6} className="p-0">
                <Rule />
              </td>
            </tr>
            {EXCHANGES.map((e) => {
              const disabled = e.status === "coming";
              return (
                <tr
                  key={e.id}
                  onClick={() => !disabled && onStart()}
                  className={cn(
                    "group border-b border-[var(--rule)] last:border-b-0 transition-colors align-middle",
                    !disabled && "cursor-pointer hover:bg-[var(--bg-hover)]",
                    disabled && "opacity-60",
                  )}
                >
                  <td className="py-[var(--s-5)] pr-[var(--s-4)]">
                    <div className="flex items-center gap-[var(--s-3)]">
                      <img
                        src={e.logo}
                        alt={e.name}
                        height={20}
                        className="h-[20px] w-auto max-w-[140px] shrink-0"
                        loading="lazy"
                      />
                      {e.tier && (
                        <span className="mono text-[11px] text-[var(--accent)] whitespace-nowrap">
                          · {e.tier}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-[var(--s-5)] pr-[var(--s-4)]">
                    <span
                      className={cn(
                        "inline-flex items-center gap-[6px] mono text-[12px]",
                        e.type === "CEX"
                          ? "text-[var(--ink)]"
                          : "text-[var(--accent)]",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "inline-block w-[6px] h-[6px] rounded-full",
                          e.type === "CEX"
                            ? "bg-[var(--ink)]"
                            : "bg-[var(--accent)]",
                        )}
                      />
                      {e.type}
                    </span>
                  </td>
                  <td className="py-[var(--s-5)] pr-[var(--s-4)]">
                    <div className="flex flex-col gap-[2px]">
                      <span
                        className={cn(
                          "mono text-[18px]",
                          e.rebateRate === null
                            ? "text-[var(--ink-muted)]"
                            : "text-[var(--ink)]",
                        )}
                      >
                        {rebateLabel(e)}
                      </span>
                      {e.rebateNote && (
                        <span className="text-[12px] text-[var(--ink-muted)]">
                          {e.rebateNote}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-[var(--s-5)] pr-[var(--s-4)] mono text-[14px] text-[var(--ink)]">
                    {fmtPct(e.makerFee)}
                  </td>
                  <td className="py-[var(--s-5)] pr-[var(--s-4)] mono text-[14px] text-[var(--ink)]">
                    {fmtPct(e.takerFee)}
                  </td>
                  <td className="py-[var(--s-5)] mono text-[15px] text-[var(--ink)] text-right">
                    {fmtUSDT(e.avgRebate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-[var(--s-6)] flex flex-wrap items-baseline gap-x-[var(--s-6)] gap-y-[var(--s-2)] text-[13px] text-[var(--ink-muted)]">
        <span>
          <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--ink)] align-middle mr-[6px]" />
          CEX — centralized · UID-linked
        </span>
        <span>
          <span className="inline-block w-[6px] h-[6px] rounded-full bg-[var(--accent)] align-middle mr-[6px]" />
          DEX — on-chain · wallet-linked
        </span>
        <a
          href="#how"
          className="text-[var(--ink)] hover:text-[var(--accent)] ml-auto"
        >
          How rates are negotiated →
        </a>
      </div>
    </section>
  );
}

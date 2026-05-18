import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Rule } from "../primitives/Rule";
import { TONES } from "../../data/tones";
import { cn } from "../../lib/cn";

export function ToneShowcase() {
  const [active, setActive] = useState(TONES[0].id);
  const tone = TONES.find((t) => t.id === active)!;

  return (
    <section
      className="container pt-[var(--s-24)] scroll-mt-[80px]"
      aria-labelledby="tone-heading"
    >
      <SectionHeader
        eyebrow="Voice & tone"
        title={
          <>
            One product.{" "}
            <span className="text-[var(--ink-muted)]">Three honest ways to say it.</span>
          </>
        }
        description="The site you're reading is voiced in 'The Quiet Math.' Same product, different copy for different surfaces — pick a tab to hear it."
      />
      <h3 id="tone-heading" className="sr-only">Voice and tone candidates</h3>

      <div className="mt-[var(--s-12)]">
        <div
          role="tablist"
          aria-label="Voice candidates"
          className="flex flex-wrap items-baseline gap-x-[var(--s-8)] gap-y-[var(--s-3)] pb-[var(--s-4)] border-b border-[var(--rule)]"
        >
          {TONES.map((t) => {
            const selected = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`tone-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative pb-[var(--s-3)] -mb-[var(--s-4)] text-[15px] transition-colors",
                  selected
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
                )}
              >
                <span className="mono text-[var(--ink-subtle)] mr-[var(--s-2)] text-[12px]">
                  {String(TONES.indexOf(t) + 1).padStart(2, "0")}
                </span>
                {t.label}
                {selected && (
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--ink)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`tone-${tone.id}`}
          aria-labelledby={`tab-${tone.id}`}
          className="grid gap-[var(--s-12)] md:grid-cols-[1.4fr_1fr] mt-[var(--s-8)]"
        >
          <div className="flex flex-col gap-[var(--s-6)]">
            <p className="t-h1 text-[var(--ink)]">{tone.hero}</p>
            <p className="t-body text-[var(--ink-muted)] max-w-[60ch]">
              {tone.sub}
            </p>
            <div className="flex items-baseline gap-[var(--s-4)]">
              <span className="text-[var(--ink)] underline underline-offset-[6px] decoration-[var(--rule-strong)] hover:decoration-[var(--accent)] cursor-pointer">
                {tone.cta}
              </span>
              <span className="mono text-[13px] text-[var(--ink-subtle)]">
                primary CTA
              </span>
            </div>
            <Rule />
            <p className="t-small text-[var(--ink-muted)]">
              {tone.trust}
            </p>
          </div>

          <aside className="flex flex-col gap-[var(--s-4)]">
            <div>
              <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
                Voice
              </p>
              <p className="text-[14px]">{tone.voice}</p>
            </div>
            <Rule />
            <div>
              <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
                Use it for
              </p>
              <p className="text-[14px]">{tone.use}</p>
            </div>
            <Rule />
            <div>
              <p className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
                References
              </p>
              <p className="text-[14px] mono">
                {tone.references.join(" · ")}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

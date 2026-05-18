import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Rule } from "../primitives/Rule";
import { FAQS } from "../../data/faqs";
import { cn } from "../../lib/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="container pt-[var(--s-24)] scroll-mt-[80px]"
      aria-labelledby="faq-heading"
    >
      <SectionHeader
        eyebrow="FAQ"
        title={
          <>
            Direct answers.{" "}
            <span className="text-[var(--ink-muted)]">No marketing detour.</span>
          </>
        }
      />
      <h3 id="faq-heading" className="sr-only">Frequently asked questions</h3>

      <div className="mt-[var(--s-12)]">
        <Rule />
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={faq.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full grid grid-cols-[1fr_24px] gap-[var(--s-4)] py-[var(--s-6)] text-left items-baseline hover:bg-[var(--bg-hover)] transition-colors -mx-[var(--s-2)] px-[var(--s-2)]"
              >
                <span className="t-h3">{faq.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "text-[var(--ink-muted)] mono text-[18px] transition-transform justify-self-end",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-[var(--dur-base)] ease-[var(--ease-out)]",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="t-body text-[var(--ink-muted)] pb-[var(--s-6)] max-w-[72ch]">
                    {faq.a}
                  </p>
                </div>
              </div>
              <Rule />
            </div>
          );
        })}
      </div>
    </section>
  );
}

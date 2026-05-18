import { Button } from "../primitives/Button";
import type { View } from "../../App";

type Props = {
  view: View;
  onNavigate: (view: View) => void;
};

const NAV: { label: string; anchor: string }[] = [
  { label: "Guide", anchor: "how" },
  { label: "Event", anchor: "event" },
  { label: "Exchanges", anchor: "exchanges" },
  { label: "Point Calculator", anchor: "calculator" },
];

export function Header({ view, onNavigate }: Props) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:rgb(10_10_10_/_0.78)] border-b border-[var(--rule)]">
      <div className="container flex items-center justify-between h-[64px]">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-baseline gap-[6px]"
          aria-label="ReboundX, home"
        >
          <span className="text-[18px] font-semibold tracking-[-0.02em]">
            Rebound
          </span>
          <span
            className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--accent)]"
            aria-hidden
          >
            X
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-[28px]" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={`#${item.anchor}`}
              className="text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[8px]">
          {view !== "dashboard" && (
            <Button
              variant="ghost"
              size="md"
              onClick={() => onNavigate("dashboard")}
              className="hidden sm:inline-flex"
            >
              Dashboard
            </Button>
          )}
          <Button
            size="md"
            onClick={() => onNavigate("onboarding")}
            trailingArrow
          >
            Start
          </Button>
        </div>
      </div>
    </header>
  );
}

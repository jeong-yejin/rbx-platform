import { Rule } from "../primitives/Rule";

export function Footer() {
  return (
    <footer className="mt-[var(--s-32)] pb-[var(--s-12)]">
      <div className="container">
        <Rule />
        <div className="pt-[var(--s-8)] grid gap-[var(--s-8)] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
              Product
            </div>
            <ul className="space-y-[6px] text-[14px]">
              <li><a className="hover:text-[var(--accent)]" href="#how">How it works</a></li>
              <li><a className="hover:text-[var(--accent)]" href="#exchanges">Exchanges</a></li>
              <li><a className="hover:text-[var(--accent)]" href="#trust">Trust</a></li>
            </ul>
          </div>
          <div>
            <div className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
              Company
            </div>
            <ul className="space-y-[6px] text-[14px]">
              <li><a className="hover:text-[var(--accent)]" href="#">About</a></li>
              <li><a className="hover:text-[var(--accent)]" href="#">Audit reports</a></li>
              <li><a className="hover:text-[var(--accent)]" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
              Legal
            </div>
            <ul className="space-y-[6px] text-[14px]">
              <li><a className="hover:text-[var(--accent)]" href="#">Terms</a></li>
              <li><a className="hover:text-[var(--accent)]" href="#">Privacy</a></li>
              <li><a className="hover:text-[var(--accent)]" href="#">Cookies</a></li>
            </ul>
          </div>
          <div>
            <div className="t-micro text-[var(--ink-muted)] mb-[var(--s-2)]">
              ReboundX
            </div>
            <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">
              We return the referrer commission that exchanges already pay — to the trader who earned it.
            </p>
          </div>
        </div>
        <div className="mt-[var(--s-8)] flex items-center justify-between text-[12px] text-[var(--ink-subtle)]">
          <span>© ReboundX 2026</span>
          <span>Last audit: 2026-05-01</span>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { LandingView } from "./views/LandingView";
import { OnboardingShell } from "./components/flow/OnboardingShell";
import { Dashboard } from "./components/dashboard/Dashboard";
import type { Exchange } from "./data/exchanges";

export type View = "landing" | "onboarding" | "dashboard";

type FinishedData = {
  exchange: Exchange;
  uid: string;
  address: string;
  network: string;
};

type DocumentWithViewTransition = Document & {
  startViewTransition: (cb: () => void) => void;
};

function runTransition(cb: () => void): void {
  if (typeof document === "undefined") {
    cb();
    return;
  }
  if ("startViewTransition" in document) {
    (document as DocumentWithViewTransition).startViewTransition(cb);
  } else {
    cb();
  }
}

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [finished, setFinished] = useState<FinishedData | null>(null);

  const navigate = (next: View) => {
    runTransition(() => setView(next));
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Header view={view} onNavigate={navigate} />
      <div className="flex-1">
        {view === "landing" && (
          <LandingView onStart={() => navigate("onboarding")} />
        )}
        {view === "onboarding" && (
          <OnboardingShell
            onFinished={(data) => {
              setFinished(data);
              navigate("dashboard");
            }}
            onExit={() => navigate("landing")}
          />
        )}
        {view === "dashboard" && (
          <Dashboard
            data={
              finished
                ? {
                    exchangeName: finished.exchange.name,
                    uid: finished.uid,
                    address: finished.address,
                    network: finished.network,
                  }
                : null
            }
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

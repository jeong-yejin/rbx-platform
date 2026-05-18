import { Hero } from "../components/hero/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Event } from "../components/sections/Event";
import { Exchanges } from "../components/sections/Exchanges";
import { Trust } from "../components/sections/Trust";
import { ToneShowcase } from "../components/sections/ToneShowcase";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";

type Props = {
  onStart: () => void;
};

export function LandingView({ onStart }: Props) {
  return (
    <main>
      <Hero onStart={onStart} />
      <HowItWorks onStart={onStart} />
      <Event onStart={onStart} />
      <Exchanges onStart={onStart} />
      <Trust />
      <ToneShowcase />
      <FAQ />
      <FinalCTA onStart={onStart} />
    </main>
  );
}

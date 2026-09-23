import PlaceholderImage from "@/components/ui/PlaceholderImage";
import StatBlock from "@/components/ui/StatBlock";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { ROLES } from "@/components/sections/academia/MeetSolimar";

export default function FounderSpotlight() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-12 lg:gap-20 lg:px-8">
        <Reveal className="-mx-6 md:mx-0">
          <PlaceholderImage
            src="/images/solimar-rengel.jpg"
            alt="Solimar Rengel, fundadora de PSAI FLOW ACADEMY"
            className="aspect-[4/5] w-full shadow-soft"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col items-start gap-5 sm:gap-7">
            <Eyebrow>Fundadora</Eyebrow>
            <h2 className="font-heading text-3xl leading-tight text-primary sm:text-4xl lg:text-[2.75rem]">
              Conoce a Solimar
            </h2>
            <p className="text-xs uppercase tracking-[0.15em] text-ink-subtle">{ROLES.join(" · ")}</p>

            <StatBlock value="35+" label="Años de trayectoria" />

            <Button href="/academia#solimar-rengel" variant="outline" size="md">
              Conocer su historia
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

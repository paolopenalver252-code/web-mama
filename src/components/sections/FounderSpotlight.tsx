import PlaceholderImage from "@/components/ui/PlaceholderImage";
import StatBlock from "@/components/ui/StatBlock";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

export default function FounderSpotlight() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-12 lg:gap-20 lg:px-8">
        <Reveal>
          <PlaceholderImage
            src="/images/solimar-rengel.jpg"
            alt="Solimar Rengel, fundadora de PSAI FLOW ACADEMY"
            className="aspect-[4/5] w-full shadow-soft"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>Fundadora</Eyebrow>
            <h2 className="font-heading text-3xl text-primary sm:text-4xl">Conoce a Solimar</h2>

            <StatBlock value="35+" label="Años de trayectoria" />

            <p className="max-w-md text-base leading-relaxed text-ink/65">
              Biografía pendiente de contenido definitivo.
            </p>

            <Button href="/academia#solimar-rengel" variant="outline" size="md">
              Conocer su historia
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

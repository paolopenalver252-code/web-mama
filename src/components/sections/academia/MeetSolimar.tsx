import PlaceholderImage from "@/components/ui/PlaceholderImage";
import StatBlock from "@/components/ui/StatBlock";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

const ROLES = ["Escritora", "Formadora", "Investigadora", "Creadora del Método PSAI FLOW®"];

export default function MeetSolimar() {
  return (
    <section id="solimar-rengel" className="scroll-mt-24 bg-surface py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-12 lg:px-8">
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
            <h2 className="font-heading text-3xl text-primary sm:text-4xl">Conoce a Solimar Rengel</h2>

            <StatBlock value="35+" label="Años de experiencia" />

            <ul className="flex flex-wrap gap-3">
              {ROLES.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-primary/10 bg-surface-alt px-4 py-2 text-sm text-primary/80"
                >
                  {role}
                </li>
              ))}
            </ul>

            <p className="max-w-md text-base leading-relaxed text-ink/60">
              Biografía pendiente de contenido definitivo.
            </p>

            <Button href="/academia/solimar-rengel" variant="outline" size="md">
              Leer biografía completa
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

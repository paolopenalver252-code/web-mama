import PlaceholderImage from "@/components/ui/PlaceholderImage";
import StatBlock from "@/components/ui/StatBlock";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

const ROLES = ["Escritora", "Formadora", "Investigadora", "Creadora del Método PSAI FLOW®"];

const BIO = [
  "Solimar Rengel es terapeuta holística, formadora y creadora de metodologías propias, con más de 35 años de experiencia en el ámbito de la conciencia, la espiritualidad, la energía y la transformación personal.",
  "Su camino comenzó a los 10 años, cuando ya vivía experiencias intuitivas y espirituales, practicaba imposición de manos, leía las cartas y tenía experiencias de percepción y comunicación espiritual.",
  "A los 17 años inició una etapa decisiva de aprendizaje junto a quien fue su primer maestro, un chamán y médico homeópata perteneciente a una familia de tradición chamánica del Perú.",
  "Desde entonces, ha continuado estudiando e integrando diferentes disciplinas, entre ellas Psicología Holística, Parapsicología, Coaching, Reiki, Medicina Holística, Medicina Tradicional China, Naturopatía, Astrología, Psicotarot, Cábala, Numerología, Radiestesia, Péndulo Hebreo, Feng Shui, diferentes corrientes de magia, técnicas energéticas y espirituales, entre muchas otras.",
  "Toda esta experiencia y formación han dado lugar a una visión propia e integradora de la transformación personal y energética.",
  "Es creadora de Psicotransformación Método PSAI Flow®️ – Código Origen y de Magia Universal Cuántica, así como del curso Limpieza, Magia y Protección.",
  "Su trabajo nace de la unión entre experiencia, conocimiento, práctica y conciencia, integrando diferentes caminos de aprendizaje en metodologías propias orientadas al crecimiento, la transformación y el equilibrio integral de la persona.",
];

export default function MeetSolimar() {
  return (
    <section id="solimar-rengel" className="scroll-mt-24 bg-surface py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-6 md:grid-cols-2 md:gap-12 lg:px-8">
        <Reveal>
          <PlaceholderImage
            src="/images/solimar-rengel.jpg"
            alt="Solimar Rengel, fundadora de PSAI FLOW ACADEMY"
            className="aspect-[4/5] w-full shadow-soft md:sticky md:top-24"
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

            <div className="flex max-w-xl flex-col gap-4 text-base leading-relaxed text-ink-muted">
              {BIO.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-2 border-t border-primary/10 pt-6">
              <p className="font-heading text-lg uppercase tracking-wide text-primary">
                Más de 35 años de experiencia
              </p>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-muted">
                Una vida dedicada al conocimiento, la transformación y la conciencia.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const CONCEPTS = [
  { value: "35+ años", label: "de experiencia" },
  { value: "Método PSAI FLOW®", label: "Psicotransformación Integral" },
  { value: "Formación", label: "Conocimiento y práctica" },
];

/**
 * "Qué es PSAI FLOW": explicación breve (mismo texto de filosofía ya
 * aprobado que antes acompañaba a la fila P·S·A·I) + una fila de 3
 * conceptos clave, en vez de repetir aquí el desglose completo P·S·A·I —
 * ese desglose ya vive en detalle en /metodo-psai-flow (ver PsaiLetters.tsx),
 * así que esta sección de Home solo invita a profundizar allí.
 */
export default function PsaiExplainer() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <Eyebrow>PSAI FLOW®</Eyebrow>
            <h2 className="font-heading text-3xl leading-tight text-primary sm:text-4xl">
              Un método. Una filosofía. Un camino de transformación.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4 text-center text-sm leading-relaxed text-ink-muted text-body">
            <p>Creemos que la transformación comienza en el interior.</p>
            <p>
              Nuestra filosofía parte de una visión integral de la persona, entendiendo que
              pensamiento, emociones, acciones y conciencia están conectados. Por eso, el Método
              PSAI FLOW® busca acompañar cada proceso desde el autoconocimiento, la coherencia y
              el equilibrio, respetando el ritmo y la experiencia única de cada persona.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 divide-y divide-primary/10 border-y border-primary/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {CONCEPTS.map((concept) => (
              <div key={concept.value} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
                <span className="font-heading text-xl text-accent-text sm:text-2xl">{concept.value}</span>
                <span className="text-xs uppercase tracking-[0.15em] text-ink-subtle">{concept.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <Button href="/metodo-psai-flow" variant="outline" size="md">
              Descubrir el método
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

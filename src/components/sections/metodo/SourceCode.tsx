import { Fingerprint } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function SourceCode() {
  return (
    <section className="bg-primary py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <Fingerprint className="text-accent" size={26} strokeWidth={1.5} />
          </span>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-6">
            <SectionHeading eyebrow="El concepto" title="Código Fuente" tone="dark" />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-base italic leading-relaxed text-white/50">
            Explicación pendiente de contenido definitivo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

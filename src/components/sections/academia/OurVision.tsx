import { Eye } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

export default function OurVision() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-8 rounded-3xl border border-primary/10 bg-surface-alt p-10 sm:flex-row sm:items-center sm:gap-12 sm:p-14">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary">
              <Eye className="text-accent" size={32} strokeWidth={1.5} />
            </span>
            <div className="flex flex-col items-start gap-3 text-left">
              <Eyebrow>Hacia dónde vamos</Eyebrow>
              <h2 className="font-heading text-3xl text-primary sm:text-4xl">Nuestra Visión</h2>
              <p className="max-w-2xl text-base italic leading-relaxed text-ink/50">
                Declaración de visión pendiente de contenido definitivo.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

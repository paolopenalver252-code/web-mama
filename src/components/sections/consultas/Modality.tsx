import { Clock, Laptop, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const MODALITIES = [
  {
    icon: Laptop,
    title: "Online",
    description: "Desde cualquier lugar, por videollamada.",
  },
  {
    icon: MapPin,
    title: "Presencial",
    description: "En Mallorca, de forma presencial.",
  },
];

export default function Modality() {
  return (
    <section className="bg-primary py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Modalidad" title="Cómo prefieras vivirla" tone="dark" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {MODALITIES.map((modality, index) => (
            <Reveal key={modality.title} delay={index * 100}>
              <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <modality.icon className="text-accent" size={22} strokeWidth={1.5} />
                </span>
                <h3 className="font-heading text-xl text-white">{modality.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{modality.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-center gap-3 text-white/70">
            <Clock size={18} strokeWidth={1.5} className="text-accent" />
            <span className="text-sm">Duración aproximada: 90 minutos</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

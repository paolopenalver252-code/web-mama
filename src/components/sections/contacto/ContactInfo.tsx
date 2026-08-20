import { Globe, Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const INFO_CARDS = [
  { icon: Mail, title: "Email", value: "[Email pendiente]" },
  { icon: Phone, title: "Teléfono", value: "[Teléfono pendiente]" },
  { icon: MapPin, title: "Ubicación", value: "Mallorca, España" },
  { icon: Globe, title: "Atención Online", value: "Alcance internacional" },
];

export default function ContactInfo() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Vías de contacto" title="Información de contacto" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INFO_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 80} className="h-full">
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-primary/5 bg-surface-alt p-8 text-center shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <card.icon className="text-accent" size={20} strokeWidth={1.5} />
                </span>
                <h3 className="font-heading text-lg text-primary">{card.title}</h3>
                <p className="text-sm text-ink/60">{card.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

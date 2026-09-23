import { MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function Pricing() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Inversión" title="Precio y modalidad de pago" />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/5 bg-surface px-8 py-10 shadow-soft">
            <MessageCircle className="text-accent" size={26} strokeWidth={1.5} />
            <p className="text-sm leading-relaxed text-ink-subtle">
              La inversión y las facilidades de pago se personalizan en una consulta privada.
            </p>
            <Button href="/consultas" variant="accent" size="md">
              Consultar precio
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { CreditCard } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { Course } from "@/lib/courses";

export default function Pricing({ course }: { course: Course }) {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Inversión" title="Precio y modalidad de pago" />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-primary/5 bg-surface px-8 py-10 shadow-soft">
            <CreditCard className="text-accent" size={26} strokeWidth={1.5} />
            <p className="font-heading text-2xl text-primary">{course.price}</p>
            <p className="text-sm text-ink/50">
              Facilidades de pago y detalles definitivos, próximamente.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

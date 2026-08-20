import { BookMarked, Compass, Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardComingSoon from "@/components/cards/CardComingSoon";
import Reveal from "@/components/ui/Reveal";

const PLACEHOLDERS = [
  { icon: Sparkles, title: "Próximamente", description: "Nueva formación en preparación." },
  { icon: Compass, title: "Próximamente", description: "Nueva formación en preparación." },
  { icon: BookMarked, title: "Más información", description: "El catálogo completo se irá anunciando aquí." },
];

export default function OtherCoursesSection() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Catálogo"
            title="Otras formaciones"
            description="El resto de nuestro catálogo se irá anunciando aquí a medida que esté listo."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {PLACEHOLDERS.map((item, index) => (
            <Reveal key={index} delay={index * 100} className="h-full">
              <CardComingSoon icon={item.icon} title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

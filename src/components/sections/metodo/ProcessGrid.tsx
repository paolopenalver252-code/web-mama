import { HeartHandshake, Plus, RefreshCw, Sun, Target, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardFeature from "@/components/cards/CardFeature";
import Reveal from "@/components/ui/Reveal";

const PROCESS_POINTS = [
  { icon: HeartHandshake, title: "Gestión emocional" },
  { icon: Users, title: "Coaching" },
  { icon: RefreshCw, title: "Transformación de patrones" },
  { icon: Sun, title: "Autoestima" },
  { icon: Target, title: "Propósito" },
  { icon: Plus, title: "Y mucho más" },
];

export default function ProcessGrid() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="El proceso" title="¿Qué se trabaja durante el proceso?" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-3">
          {PROCESS_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 80} className="h-full">
              <CardFeature icon={point.icon} title={point.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

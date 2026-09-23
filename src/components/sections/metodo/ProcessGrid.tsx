import { HeartHandshake, Plus, RefreshCw, Sun, Target, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureTags from "@/components/ui/FeatureTags";
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
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="El proceso" title="¿Qué se trabaja durante el proceso?" />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-14 max-w-3xl">
            <FeatureTags items={PROCESS_POINTS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { Compass, Eye, Lightbulb, Sparkles, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardFeature from "@/components/cards/CardFeature";
import Reveal from "@/components/ui/Reveal";

const PROFILES = [
  { icon: Compass, title: "Personas que buscan mayor claridad en momentos de cambio" },
  { icon: Eye, title: "Quienes desean conocerse mejor y comprender sus procesos personales" },
  { icon: Sparkles, title: "Personas interesadas en su desarrollo personal y espiritual" },
  { icon: Users, title: "Quienes desean identificar patrones familiares y transformarlos" },
  {
    icon: Lightbulb,
    title: "Personas que buscan orientación para sus proyectos, relaciones o propósito de vida",
  },
];

export default function ForWhom() {
  return (
    <section className="bg-surface-alt py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Perfiles" title="¿Para quién está dirigida?" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROFILES.map((profile, index) => (
            <Reveal key={profile.title} delay={index * 80} className="h-full">
              <CardFeature icon={profile.icon} title={profile.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

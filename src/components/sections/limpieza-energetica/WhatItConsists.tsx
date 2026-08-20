import { ClipboardCheck, Shield, Waves } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Evaluación",
    description: "Evaluación energética personalizada.",
  },
  {
    icon: Waves,
    title: "Armonización",
    description: "Armonización basada en el Método PSAI FLOW®.",
  },
  {
    icon: Shield,
    title: "Protección",
    description: "Protección energética duradera.",
  },
];

export default function WhatItConsists() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="El proceso" title="¿En qué consiste?" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <step.icon className="text-accent" size={24} strokeWidth={1.5} />
                </span>
                <h3 className="font-heading text-lg text-primary">{step.title}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-ink/65">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

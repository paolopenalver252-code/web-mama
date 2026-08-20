import SectionHeading from "@/components/ui/SectionHeading";
import CardFeature from "@/components/cards/CardFeature";
import Reveal from "@/components/ui/Reveal";
import type { Course } from "@/lib/courses";

export default function WhatYouLearn({ course }: { course: Course }) {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Contenidos" title="¿Qué aprenderás?" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {course.whatYouLearn.map((point, index) => (
            <Reveal key={point.title} delay={index * 60} className="h-full">
              <CardFeature icon={point.icon} title={point.title} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

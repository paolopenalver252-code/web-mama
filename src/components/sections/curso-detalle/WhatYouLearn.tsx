import SectionHeading from "@/components/ui/SectionHeading";
import FeatureTags from "@/components/ui/FeatureTags";
import Reveal from "@/components/ui/Reveal";
import type { Course } from "@/lib/courses";

export default function WhatYouLearn({ course }: { course: Course }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Contenidos" title="¿Qué aprenderás?" />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-14 max-w-4xl">
            <FeatureTags items={course.whatYouLearn} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

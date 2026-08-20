import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import type { Course } from "@/lib/courses";

export default function InstructorSection({ course }: { course: Course }) {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-14 px-6 sm:grid-cols-[auto_1fr] lg:px-8">
        <Reveal>
          <PlaceholderImage
            label="Fotografía pendiente"
            className="aspect-square w-40 shrink-0 shadow-soft sm:w-48"
          />
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-col items-start gap-3">
            <Eyebrow>Tu instructora</Eyebrow>
            <h2 className="font-heading text-2xl text-primary">{course.instructor.name}</h2>
            <p className="text-sm text-ink/60">{course.instructor.role}</p>
            <Button href="/academia#solimar-rengel" variant="outline" size="sm" className="mt-2">
              Conocer su historia
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

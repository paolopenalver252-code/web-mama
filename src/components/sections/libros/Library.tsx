import SectionHeading from "@/components/ui/SectionHeading";
import CardBook from "@/components/cards/CardBook";
import Reveal from "@/components/ui/Reveal";
import { BOOKS } from "@/lib/books";

export default function Library() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Catálogo" title="Biblioteca" />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {BOOKS.map((book, index) => (
            <Reveal key={book.slug} delay={index * 100} className="h-full">
              <CardBook {...book} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

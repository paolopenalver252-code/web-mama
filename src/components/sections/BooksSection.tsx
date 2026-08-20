import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import CardBook from "@/components/cards/CardBook";
import Reveal from "@/components/ui/Reveal";
import { BOOKS } from "@/lib/books";

export default function BooksSection() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Publicaciones" title="Libros" />
        </Reveal>

        <div className="mt-14">
          {BOOKS.length > 0 ? (
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
              {BOOKS.map((book, index) => (
                <Reveal key={book.slug} delay={index * 100} className="h-full">
                  <CardBook {...book} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <EmptyState
                icon={BookOpen}
                title="Catálogo en preparación"
                description="Aquí se mostrarán las publicaciones de PSAI FLOW ACADEMY en cuanto se confirmen títulos, portadas y enlaces de compra."
              />
            </Reveal>
          )}
        </div>

        {BOOKS.length > 0 ? (
          <Reveal delay={200}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/libros"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 hover:text-accent-text"
              >
                Ver todos los libros
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

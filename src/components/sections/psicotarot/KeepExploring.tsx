import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const LINKS = [
  { label: "Volver a Inicio", href: "/" },
  { label: "Ver las tres especialidades", href: "/#especialidades" },
  { label: "Ir a Consultas", href: "/consultas" },
];

export default function KeepExploring() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <nav className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 hover:text-accent-text"
              >
                {link.label}
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

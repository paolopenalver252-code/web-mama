import Link from "next/link";
import { LEGAL_ITEMS, NAV_ITEMS } from "@/lib/navigation";
import Reveal from "@/components/ui/Reveal";

// TODO: sustituir por las URLs reales de los perfiles del cliente.
const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white/70">
      <Reveal className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex flex-col leading-none transition-opacity duration-300 hover:opacity-75"
            >
              <span className="font-heading text-2xl text-white">PSAI FLOW</span>
              <span className="text-[0.65rem] font-sans uppercase tracking-[0.3em] text-accent">
                Academy
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {/* TODO: descripción breve pendiente de copy definitivo del cliente. */}
              [Descripción breve de la academia — pendiente de texto definitivo]
            </p>
            <ul className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación rápida */}
          <div>
            <h3 className="font-heading text-lg text-white">Navegación</h3>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-heading text-lg text-white">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              {/* TODO: datos de contacto reales pendientes del cliente. */}
              <li>[Email pendiente]</li>
              <li>[Teléfono pendiente]</li>
              <li>[Ciudad / país pendiente]</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-lg text-white">Legal</h3>
            <ul className="mt-4 space-y-3">
              {LEGAL_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-white/50 lg:px-8">
          © {year} PSAI FLOW ACADEMY. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

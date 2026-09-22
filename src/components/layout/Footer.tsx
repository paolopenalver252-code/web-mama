import Link from "next/link";
import { LEGAL_ITEMS, NAV_ITEMS } from "@/lib/navigation";
import Reveal from "@/components/ui/Reveal";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/Solimar_Rengel" },
  { label: "Facebook", href: "https://www.facebook.com/janice.rengel/" },
  { label: "YouTube", href: "https://www.youtube.com/@solimarrengel8473" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-mist">
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist text-body">
              {/* TODO: descripción breve pendiente de copy definitivo del cliente. */}
              [Descripción breve de la academia — pendiente de texto definitivo]
            </p>
            <ul className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                    className="text-sm text-mist transition-colors duration-300 hover:text-accent"
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
                    className="text-sm text-mist transition-colors duration-300 hover:text-accent"
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
            <ul className="mt-4 space-y-3 text-sm text-mist">
              <li>
                <a href="mailto:Soymillonaria520@gmail.com" className="transition-colors duration-300 hover:text-accent">
                  Soymillonaria520@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+34601174247" className="transition-colors duration-300 hover:text-accent">
                  +34 601 174 247
                </a>
              </li>
              <li>Mallorca, España</li>
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
                    className="text-sm text-mist transition-colors duration-300 hover:text-accent"
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
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-mist-subtle lg:px-8">
          © {year} PSAI FLOW ACADEMY. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

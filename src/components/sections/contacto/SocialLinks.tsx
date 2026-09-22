import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { cardHover } from "@/lib/motion/classNames";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/Solimar_Rengel",
    Icon: InstagramIcon,
    invite: "Contenido inspirador, novedades y el día a día de la Academia.",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/janice.rengel/",
    Icon: FacebookIcon,
    invite: "Publicaciones, eventos y actualizaciones de la comunidad PSAI FLOW.",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@solimarrengel8473",
    Icon: YoutubeIcon,
    invite: "Vídeos, recursos formativos y contenido sobre el Método PSAI FLOW®.",
  },
];

export default function SocialLinks() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Comunidad" title="Síguenos en redes" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SOCIALS.map((social, index) => (
            <Reveal key={social.label} delay={index * 100} className="h-full">
              <a
                href={social.href}
                aria-label={`Síguenos en ${social.label}`}
                target={social.href !== "#" ? "_blank" : undefined}
                rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                className={`group flex h-full flex-col items-center gap-4 rounded-2xl border border-primary/10 bg-surface px-8 py-10 text-center ${cardHover}`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-accent/5 text-accent-text transition-colors duration-300 group-hover:bg-accent/10">
                  <social.Icon size={24} strokeWidth={1.5} />
                </span>
                <span className="font-heading text-xl text-primary">{social.label}</span>
                <p className="text-sm leading-relaxed text-ink-muted text-body">{social.invite}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

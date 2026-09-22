import type { SVGProps } from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/**
 * Iconos de redes sociales dibujados a mano (trazo, mismo lenguaje visual
 * que lucide-react: viewBox 24x24, stroke, linecap/linejoin redondeados).
 * lucide-react retiró los iconos de marca de sus últimas versiones, así
 * que se definen aquí en vez de añadir una dependencia nueva solo para
 * tres glifos.
 */
function IconBase({
  size = 24,
  strokeWidth = 1.5,
  className,
  children,
  ...rest
}: IconProps & { children: React.ReactNode } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </IconBase>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </IconBase>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 21l1.3-4.5A8.5 8.5 0 1 1 7.8 19.5L3 21z" />
      <path d="M8.7 9.3c0-.45.4-.9.9-.9h.4c.3 0 .55.2.65.5l.45 1.3c.1.3.02.6-.18.8l-.45.45a5.2 5.2 0 0 0 2.35 2.35l.45-.45c.2-.2.5-.28.8-.18l1.3.45c.3.1.5.35.5.65v.4c0 .5-.45.9-.9.9-3.3 0-6.1-2.8-6.1-6.1z" />
    </IconBase>
  );
}

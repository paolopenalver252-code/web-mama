import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "accent" | "primary" | "outline" | "ghost";
type Size = "sm" | "md";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  // bg-accent-text (no bg-accent): el dorado decorativo #C8A35F no cumple
  // 4.5:1 con texto blanco encima — se usa la variante accesible.
  accent: "bg-accent-text text-white shadow-soft hover:bg-accent-text-hover hover:-translate-y-0.5",
  primary: "bg-primary text-white shadow-soft hover:bg-secondary hover:-translate-y-0.5",
  outline: "border border-primary/20 text-primary hover:border-accent hover:text-accent-text",
  ghost: "text-primary hover:text-accent-text",
};

// El padding derecho de "accent" es menor: el capuchón circular ya aporta
// su propio espacio visual y debe quedar casi al ras del borde del pill.
const sizePadding: Record<Variant, Record<Size, string>> = {
  accent: { sm: "py-2 pl-6 pr-2 text-sm", md: "py-2.5 pl-8 pr-2.5 text-base" },
  primary: { sm: "px-6 py-2.5 text-sm", md: "px-8 py-3.5 text-base" },
  outline: { sm: "px-6 py-2.5 text-sm", md: "px-8 py-3.5 text-base" },
  ghost: { sm: "px-6 py-2.5 text-sm", md: "px-8 py-3.5 text-base" },
};

const capSize: Record<Size, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
};

function ArrowCap({ size }: { size: Size }) {
  return (
    <span
      className={`inline-flex ${capSize[size]} shrink-0 items-center justify-center rounded-full bg-white/15 transition-all duration-300 ease-out group-hover:rotate-45 group-hover:bg-white/25`}
    >
      <ArrowUpRight size={size === "sm" ? 14 : 16} strokeWidth={2} />
    </span>
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    href: string;
  };

type ButtonAsButton = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${sizePadding[variant][size]} ${className}`;
  const cap = variant === "accent" ? <ArrowCap size={size} /> : null;

  if ("href" in props) {
    const { href, children, ...rest } = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- excluidos del spread hacia el DOM
    const { variant: _variant, size: _size, className: _className, ...linkProps } = rest;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
        {cap}
      </Link>
    );
  }

  const { children, ...rest } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- excluidos del spread hacia el DOM
  const { variant: _variant, size: _size, className: _className, ...buttonProps } = rest;
  return (
    <button {...buttonProps} className={classes}>
      {children}
      {cap}
    </button>
  );
}

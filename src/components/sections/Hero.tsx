import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import Parallax from "@/components/ui/Parallax";
import Eyebrow from "@/components/ui/Eyebrow";
import CountUp from "@/components/ui/CountUp";

/**
 * Hero cinematográfico a pantalla completa. El "fondo" no es una fotografía
 * sino una pieza visual propia (gradiente + líneas arquitectónicas en
 * perspectiva + halo de luz cenital) que evita cualquier imaginería
 * esotérica típica del sector y evoca, en su lugar, arquitectura
 * contemporánea, luz natural y una entrada a una academia internacional.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-primary lg:min-h-[92vh]">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#0B2440_0%,#163B67_46%,#0F2D52_100%)]" />

        {/* Halo de luz cenital — como luz natural entrando por un lucernario */}
        <Parallax
          speed={12}
          className="absolute left-1/2 top-[-25%] h-[62rem] w-[62rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),rgba(200,163,95,0.05)_45%,transparent_70%)]"
        />

        {/* Líneas arquitectónicas en perspectiva: el vestíbulo de una gran academia */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.16]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <g stroke="white" strokeWidth="1">
            <line x1="720" y1="900" x2="-260" y2="0" />
            <line x1="720" y1="900" x2="80" y2="0" />
            <line x1="720" y1="900" x2="420" y2="0" />
            <line x1="720" y1="900" x2="1020" y2="0" />
            <line x1="720" y1="900" x2="1360" y2="0" />
            <line x1="720" y1="900" x2="1700" y2="0" />
          </g>
          <g stroke="#C8A35F" strokeWidth="1.5" opacity="0.55">
            <line x1="560" y1="900" x2="560" y2="0" />
            <line x1="880" y1="900" x2="880" y2="0" />
          </g>
        </svg>

        {/* Degradado inferior — garantiza la legibilidad del texto sobre el fondo */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,27,49,0.92)_0%,rgba(11,27,49,0.6)_36%,rgba(11,27,49,0.15)_62%,transparent_82%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 pb-28 pt-44 text-center lg:px-8 lg:pb-32 lg:pt-56">
        <div className="animate-fade-up flex flex-col items-center gap-6">
          <Eyebrow tone="dark">Academia Internacional</Eyebrow>

          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            PSAI FLOW ACADEMY
          </h1>

          <p className="font-heading text-xl text-white/85 sm:text-2xl">
            Academia Internacional de Psicotransformación Integral
          </p>

          <p className="max-w-lg text-base leading-relaxed text-white/65">
            Especialistas en Magia Universal, Limpieza Energética y Protección.
          </p>

          <p className="border-l-2 border-accent pl-4 font-heading text-lg italic text-white/80">
            Transformando cuerpo, mente, emociones y conciencia.
          </p>

          <div className="mt-4 flex flex-col items-center gap-5">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/consultas" variant="accent" size="md">
                Reservar una consulta
              </Button>
              <Button
                href="/metodo-psai-flow"
                variant="outline"
                size="md"
                className="border-white/30 text-white hover:border-accent hover:text-accent"
              >
                Descubrir el Método PSAI FLOW
              </Button>
            </div>
            <Link
              href="/academia"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-accent"
            >
              Ver la Academia
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Tarjeta flotante — la cifra real de trayectoria, en cristal sobre el fondo */}
      <div className="absolute bottom-8 left-1/2 z-10 flex w-[15.5rem] -translate-x-1/2 items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md sm:w-64 lg:left-8 lg:translate-x-0">
        <div className="font-heading text-4xl leading-none text-accent">
          <CountUp value={35} suffix="+" />
        </div>
        <div className="text-sm leading-snug text-white/80">Años transformando vidas</div>
      </div>

      <ChevronDown
        aria-hidden
        size={22}
        strokeWidth={1.5}
        className="animate-bounce absolute bottom-8 right-8 z-10 hidden text-white/50 lg:block"
      />
    </section>
  );
}

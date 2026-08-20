"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-primary/10 bg-surface p-10 text-center shadow-soft sm:p-14">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <Mail className="text-accent" size={24} strokeWidth={1.5} />
            </span>
            <h2 className="font-heading text-2xl text-primary sm:text-3xl">
              Recibe nuevos artículos y novedades
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-ink/60">
              Suscríbete para conocer los próximos artículos del blog y las
              novedades de PSAI FLOW ACADEMY.
            </p>

            {submitted ? (
              <p className="text-sm font-medium text-accent-text">
                Gracias — en cuanto conectemos el sistema de envíos, recibirás
                nuestras novedades aquí.
              </p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
                className="flex w-full flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  className="w-full flex-1 rounded-full border border-primary/15 bg-surface px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none"
                />
                <Button type="submit" variant="accent" size="md">
                  Suscribirme
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const SERVICE_OPTIONS = [
  "Método PSAI FLOW",
  "Cursos",
  "Consultas",
  "Limpieza Energética y Protección",
  "Libros",
  "Otro",
];

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  reason: string;
  service: string;
  message: string;
  // Campo trampa anti-spam: invisible para personas, si llega relleno se descarta el envío.
  company: string;
};

const INITIAL_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  reason: "",
  service: "",
  message: "",
  company: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Indica tu nombre completo.";
  }

  if (!values.email.trim()) {
    errors.email = "Indica tu correo electrónico.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Introduce un correo electrónico válido.";
  }

  if (!values.reason.trim()) {
    errors.reason = "Cuéntanos brevemente el motivo de tu consulta.";
  }

  if (!values.service) {
    errors.service = "Selecciona el servicio que te interesa.";
  }

  if (!values.message.trim()) {
    errors.message = "Escribe tu mensaje.";
  }

  return errors;
}

const inputClasses =
  "w-full rounded-xl border border-primary/15 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition-colors duration-300 focus:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2";
const errorInputClasses = "border-red-400 focus:border-red-400";
const labelClasses = "text-sm font-medium text-primary";
const errorTextClasses = "text-xs text-red-500";

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const setField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot: si un bot rellena este campo oculto, se ignora el envío en silencio.
    if (values.company) {
      return;
    }

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    // TODO: conectar con un servicio real de envío de email (API route + Resend/SendGrid/etc.).
    window.setTimeout(() => {
      setStatus("sent");
    }, 600);
  };

  if (status === "sent") {
    return (
      <section id="formulario-contacto" className="scroll-mt-24 bg-surface-alt py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-primary/10 bg-surface p-12 text-center shadow-soft">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle2 className="text-accent" size={26} strokeWidth={1.5} />
              </span>
              <h2 className="font-heading text-2xl text-primary">Solicitud enviada</h2>
              <p className="max-w-md text-sm leading-relaxed text-ink/60">
                Gracias por escribirnos. Responderemos a tu solicitud lo
                antes posible.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario-contacto" className="scroll-mt-24 bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-primary/10 bg-surface p-8 shadow-soft sm:p-12">
            <h2 className="font-heading text-2xl text-primary sm:text-3xl">Formulario de contacto</h2>
            <p className="mt-2 text-sm text-ink/60">
              Cuéntanos qué necesitas y te responderemos lo antes posible.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-6">
              {/* Honeypot anti-spam, oculto para personas */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">No rellenar este campo</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={(event) => setField("company", event.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className={labelClasses}>
                    Nombre completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={values.fullName}
                    onChange={(event) => setField("fullName", event.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    className={`${inputClasses} ${errors.fullName ? errorInputClasses : ""}`}
                  />
                  {errors.fullName ? (
                    <p id="fullName-error" className={errorTextClasses}>
                      {errors.fullName}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={labelClasses}>
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => setField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`${inputClasses} ${errors.email ? errorInputClasses : ""}`}
                  />
                  {errors.email ? (
                    <p id="email-error" className={errorTextClasses}>
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className={labelClasses}>
                    Teléfono <span className="font-normal text-ink/40">(opcional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(event) => setField("phone", event.target.value)}
                    className={inputClasses}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className={labelClasses}>
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    required
                    value={values.service}
                    onChange={(event) => setField("service", event.target.value)}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    className={`${inputClasses} ${errors.service ? errorInputClasses : ""}`}
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.service ? (
                    <p id="service-error" className={errorTextClasses}>
                      {errors.service}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="reason" className={labelClasses}>
                  Motivo de la consulta
                </label>
                <input
                  id="reason"
                  type="text"
                  required
                  value={values.reason}
                  onChange={(event) => setField("reason", event.target.value)}
                  aria-invalid={Boolean(errors.reason)}
                  aria-describedby={errors.reason ? "reason-error" : undefined}
                  className={`${inputClasses} ${errors.reason ? errorInputClasses : ""}`}
                />
                {errors.reason ? (
                  <p id="reason-error" className={errorTextClasses}>
                    {errors.reason}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className={labelClasses}>
                  Mensaje
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={values.message}
                  onChange={(event) => setField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClasses} resize-none ${errors.message ? errorInputClasses : ""}`}
                />
                {errors.message ? (
                  <p id="message-error" className={errorTextClasses}>
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                variant="accent"
                size="md"
                disabled={status === "submitting"}
                className="mt-2 disabled:opacity-60"
              >
                {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
              </Button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

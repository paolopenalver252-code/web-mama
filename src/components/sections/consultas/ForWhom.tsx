import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function ForWhom() {
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Perfiles" title="¿Para quién son estas consultas?" />
        </Reveal>
        <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-ink-muted text-body">
          <Reveal>
            <p>
              Para personas que buscan comprender mejor lo que viven, superar bloqueos y
              encontrar nuevas perspectivas para avanzar.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p>
              Si sientes que quieres trabajar aspectos emocionales, personales o energéticos de
              tu vida, estas consultas te ofrecen un espacio de acompañamiento, reflexión y
              transformación consciente.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

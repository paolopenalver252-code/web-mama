import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Philosophy() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Filosofía" title="Nuestra filosofía" />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-ink-muted text-body">
            <p>
              En PSAI FLOW ACADEMY creemos en una visión verdaderamente integral del
              bienestar.
            </p>
            <p>
              Nuestra filosofía se basa en el equilibrio del cuerpo, la mente, las emociones y
              la conciencia. Por ello, colaboramos con una red de centros especializados en
              Mallorca, donde cada uno aporta su experiencia en un área concreta para ofrecer
              un acompañamiento complementario.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

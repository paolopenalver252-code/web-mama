import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Philosophy() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Más que libros"
            title="Filosofía"
            description="Cada publicación forma parte del proyecto educativo de PSAI FLOW ACADEMY: un complemento a las formaciones, las consultas y al propio Método PSAI FLOW®."
          />
        </Reveal>
      </div>
    </section>
  );
}

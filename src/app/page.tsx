import Hero from "@/components/sections/Hero";
import PsaiExplainer from "@/components/sections/PsaiExplainer";
import AcademyIntro from "@/components/sections/AcademyIntro";
import CourseSpotlight from "@/components/sections/CourseSpotlight";
import AcademyFeatures from "@/components/sections/AcademyFeatures";
import SpecialtiesSection from "@/components/sections/SpecialtiesSection";
import LearnOrConsult from "@/components/sections/LearnOrConsult";
import FounderSpotlight from "@/components/sections/FounderSpotlight";
import BooksSection from "@/components/sections/BooksSection";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <PsaiExplainer />
      <AcademyIntro />
      <CourseSpotlight />
      <AcademyFeatures />
      <SpecialtiesSection />
      <LearnOrConsult />
      <FounderSpotlight />
      <BooksSection />
      <FinalCta
        heading="Tu camino comienza con el conocimiento."
        description="Explora nuestras formaciones, descubre el Método PSAI FLOW® o habla directamente con nosotros."
        primaryCta={{ label: "Explorar Academia", href: "/academia" }}
        secondaryCta={{ label: "Conocer el método", href: "/metodo-psai-flow" }}
        tertiaryCta={{ label: "WhatsApp", href: "/contacto#formulario-contacto" }}
      />
    </>
  );
}

import Hero from "@/components/sections/Hero";
import SpecialtiesSection from "@/components/sections/SpecialtiesSection";
import CourseSpotlight from "@/components/sections/CourseSpotlight";
import PsaiExplainer from "@/components/sections/PsaiExplainer";
import FounderSpotlight from "@/components/sections/FounderSpotlight";
import BigStatement from "@/components/sections/BigStatement";
import BooksSection from "@/components/sections/BooksSection";
import CentersSection from "@/components/sections/CentersSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecialtiesSection />
      <CourseSpotlight />
      <PsaiExplainer />
      <FounderSpotlight />
      <BigStatement />
      <BooksSection />
      <CentersSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta
        heading="Transformando cuerpo, mente, emociones y conciencia."
        description="Da el siguiente paso: reserva una consulta o descubre todo lo que PSAI FLOW ACADEMY tiene preparado para ti."
        primaryCta={{ label: "Reservar una consulta", href: "/consultas" }}
        secondaryCta={{ label: "Conocer la Academia", href: "/academia" }}
      />
    </>
  );
}

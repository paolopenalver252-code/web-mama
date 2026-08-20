import SectionHeading from "@/components/ui/SectionHeading";
import CardArticle from "@/components/cards/CardArticle";
import Reveal from "@/components/ui/Reveal";
import { getFeaturedPost } from "@/lib/blog";

export default function FeaturedArticle() {
  const post = getFeaturedPost();

  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Destacado" title="Artículo destacado" align="left" />
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <CardArticle {...post} featured />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

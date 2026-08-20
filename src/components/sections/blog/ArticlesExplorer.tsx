"use client";

import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import CardArticle from "@/components/cards/CardArticle";
import Reveal from "@/components/ui/Reveal";
import { BLOG_CATEGORIES, getAllPosts, type BlogCategory } from "@/lib/blog";

const ALL_LABEL = "Todos";

export default function ArticlesExplorer() {
  const posts = getAllPosts();
  const [activeCategory, setActiveCategory] = useState<BlogCategory | typeof ALL_LABEL>(ALL_LABEL);

  const filteredPosts = useMemo(
    () => (activeCategory === ALL_LABEL ? posts : posts.filter((post) => post.category === activeCategory)),
    [posts, activeCategory]
  );

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="El feed" title="Últimos artículos" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 60} className="h-full">
              <CardArticle {...post} />
            </Reveal>
          ))}
        </div>

        <div className="mt-24 border-t border-primary/10 pt-16">
          <Reveal>
            <SectionHeading eyebrow="Explora por tema" title="Categorías" />
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveCategory(ALL_LABEL)}
                aria-pressed={activeCategory === ALL_LABEL}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === ALL_LABEL
                    ? "border-accent-text bg-accent-text text-white"
                    : "border-primary/15 text-primary/70 hover:border-accent hover:text-accent-text"
                }`}
              >
                {ALL_LABEL}
              </button>
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "border-accent-text bg-accent-text text-white"
                      : "border-primary/15 text-primary/70 hover:border-accent hover:text-accent-text"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

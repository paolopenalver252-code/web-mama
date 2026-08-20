"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/10 bg-surface">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-surface-alt"
            >
              <span className="font-heading text-lg text-primary transition-colors duration-300 group-hover:text-accent-text">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                className={`shrink-0 text-accent transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-ink/70">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { ProblemsStory } from "@/components/motion/problems-story";
import { problems } from "@/content/data";

const total = String(problems.cards.length).padStart(2, "0");

/**
 * Os quatro problemas, um por tela. No desktop (com movimento), a seção fica
 * fixa enquanto a rolagem acende cada frase palavra por palavra e mostra o
 * caminho para a solução; um contador marca a posição. No celular, com
 * "reduzir movimento" ou sem JavaScript, é uma lista simples.
 */
export function Problems() {
  return (
    <ProblemsStory>
      <section
        id="problemas"
        aria-labelledby="problemas-title"
        className="problems relative bg-background"
      >
        <div className="problems-stage">
          <div className="problems-inner container-site">
            <header className="problems-intro max-w-4xl">
              <h2 id="problemas-title" data-split className="text-display">
                {problems.headline}
              </h2>
              <p
                data-animate
                className="mt-8 max-w-2xl text-lead text-pretty text-muted-foreground"
              >
                {problems.intro}
              </p>
            </header>

            <p aria-hidden="true" className="problems-counter eyebrow text-muted-foreground">
              <span data-problem-counter>01</span> / {total}
            </p>

            <ol className="problems-list">
              {problems.cards.map((card, i) => (
                <li key={card.title} className="problem" data-problem={i}>
                  <span aria-hidden="true" className="problem-number eyebrow text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="problem-phrase text-display">
                    {card.title.split(" ").map((word, w) => (
                      <span key={`${word}-${w}`} className="problem-word">
                        {word}{" "}
                      </span>
                    ))}
                  </h3>
                  <div className="problem-detail">
                    <p className="max-w-xl text-lead text-pretty text-muted-foreground">
                      {card.description}
                    </p>
                    <Link
                      href={card.solution.href}
                      className="group mt-6 inline-flex items-center gap-2 font-medium text-link"
                    >
                      {card.solution.label}
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </ProblemsStory>
  );
}

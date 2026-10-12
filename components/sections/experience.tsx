import { experience } from "@/content/data";
import { cn } from "@/lib/utils";

/**
 * Trajetória do fundador como linha do tempo horizontal (em ordem
 * cronológica, da esquerda para a direita): cada etapa é um nó ligado à
 * seguinte, e o nó atual pulsa. Vertical no celular.
 */
export function Experience() {
  return (
    <div>
      <h3 className="eyebrow text-muted-foreground">{experience.title}</h3>
      <ol className="timeline mt-10">
        {experience.jobs.map((job) => (
          <li key={job.company} data-animate className="timeline-item">
            <span
              aria-hidden="true"
              className={cn("timeline-node", job.current && "timeline-node-current")}
            />
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {job.period}
            </p>
            <p className="mt-3 text-title">{job.role}</p>
            <p className="mt-1 text-muted-foreground">{job.company}</p>
            <p className="mt-4 max-w-md leading-relaxed text-pretty text-muted-foreground">
              {job.text}
            </p>
          </li>
        ))}
      </ol>

      <h3 className="mt-20 eyebrow text-muted-foreground">{experience.educationTitle}</h3>
      <ul className="mt-6 grid gap-4">
        {experience.education.map((item) => (
          <li key={item.course} data-animate>
            <p className="text-title">{item.course}</p>
            <p className="mt-1 text-muted-foreground">
              {item.school}, {item.period.toLowerCase()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

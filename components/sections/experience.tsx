import { experience } from "@/content/data";
import { cn } from "@/lib/utils";

/* Ordem cronológica inversa: o emprego atual primeiro. */
const jobs = [...experience.jobs].reverse();

/** Linha do tempo compacta, usada dentro da seção "Sobre". */
export function Experience() {
  return (
    <div>
      <h3 className="text-lg font-bold tracking-tight">{experience.title}</h3>
      <ol className="mt-6 border-l border-line">
        {jobs.map((job) => (
          <li key={job.company} className="relative pb-8 pl-6 last:pb-0">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1.5 -left-[5px] size-[9px] rounded-full border border-line-strong bg-background",
                job.current && "border-transparent bg-gradient-to-br from-grad-from to-grad-to",
              )}
            />
            <p className="text-sm text-muted-foreground">{job.period}</p>
            <p className="mt-1 font-semibold">{job.role}</p>
            <p className="text-muted-foreground">{job.company}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-10 text-lg font-bold tracking-tight">{experience.educationTitle}</h3>
      <ul className="mt-4 grid gap-3">
        {experience.education.map((item) => (
          <li key={item.course}>
            <p className="font-semibold">{item.course}</p>
            <p className="text-muted-foreground">
              {item.school}, {item.period.toLowerCase()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

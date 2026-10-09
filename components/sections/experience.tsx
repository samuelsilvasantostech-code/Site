import { Section } from "@/components/shared/section";
import { experience } from "@/content/data";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section id="experiencia" title={experience.title} intro={experience.intro}>
      <div className="lg:grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <ol className="relative grid max-w-[46rem]">
          {experience.jobs.map((job) => (
            <li key={job.company} className="tl-item" data-current={job.current}>
              <p
                className={cn(
                  "font-mono text-xs text-muted-foreground",
                  job.current && "text-brand",
                )}
              >
                {job.period}
              </p>
              <h3 className="mt-[0.3rem] text-md leading-[1.3] font-semibold">{job.company}</h3>
              <p>{job.role}</p>
              <p className="mt-2 max-w-[40rem] text-muted-foreground">{job.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 max-w-[46rem] lg:mt-0">
          <h3 className="mb-[0.9rem] text-base font-semibold">{experience.educationTitle}</h3>
          <div className="space-y-3">
            {experience.education.map((item) => (
              <div
                key={item.course}
                className="grid gap-[0.2rem] rounded-md border border-line bg-card px-[1.3rem] py-[1.2rem]"
              >
                <strong className="font-semibold">{item.course}</strong>
                <span className="text-sm text-muted-foreground">{item.school}</span>
                <span className="text-sm text-muted-foreground">{item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

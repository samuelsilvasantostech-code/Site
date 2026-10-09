import { Section } from "@/components/shared/section";
import { TagList } from "@/components/shared/tag-list";
import { integrations } from "@/content/data";

/** Plataformas com que o fundador já trabalhou em projetos reais. */
export function Integrations() {
  return (
    <Section id="plataformas" title={integrations.title} intro={integrations.intro}>
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
        {integrations.groups.map((group) => (
          <div key={group.name} data-animate className={"chips" in group ? "md:col-span-2" : ""}>
            <h3 className="mb-3 font-bold tracking-tight">{group.name}</h3>
            {"chips" in group ? (
              <TagList tags={group.chips} label={group.name} />
            ) : (
              <dl className="divide-y divide-line border-y border-line">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="grid gap-0.5 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="font-medium">{item.name}</dt>
                    <dd className="text-muted-foreground">{item.note}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

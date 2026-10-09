import { Section } from "@/components/shared/section";
import { TagList } from "@/components/shared/tag-list";
import { integrations } from "@/content/data";

/** Ferramentas e tecnologias agrupadas por finalidade (sem logos nem parcerias implícitas). */
export function Integrations() {
  return (
    <Section id="tecnologias" title={integrations.title} intro={integrations.intro}>
      <dl className="divide-y divide-line border-y border-line">
        {integrations.groups.map((group) => (
          <div
            key={group.name}
            data-animate
            className="grid gap-3 py-6 md:grid-cols-[16rem_1fr] md:items-center md:gap-8"
          >
            <dt>
              <span className="block font-display font-bold tracking-tight">{group.name}</span>
              <span className="text-sm text-muted-foreground">{group.purpose}</span>
            </dt>
            <dd>
              <TagList tags={group.items} label={group.name} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

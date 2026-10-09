import Image from "next/image";

import { Section } from "@/components/shared/section";
import { TagList } from "@/components/shared/tag-list";
import { integrations, type IntegrationGroup } from "@/content/data";
import { cn } from "@/lib/utils";

/** "Conta Azul" → "CA"; "Omie" → "Om". */
function initials(name: string) {
  const words = name
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2);
  return (words[0][0] + words[1][0]).toUpperCase();
}

function GroupTitle({ name, count }: { name: string; count: number }) {
  return (
    <h3 className="mb-4 flex items-baseline justify-between gap-4 text-base font-semibold">
      {name}
      <span className="font-mono text-xs font-normal text-muted-foreground">{count}</span>
    </h3>
  );
}

function Group({ group }: { group: IntegrationGroup }) {
  const isChips = "chips" in group;
  return (
    <section
      aria-label={group.name}
      className={cn("rounded-lg border border-line bg-card p-[1.4rem]", isChips && "md:col-span-2")}
    >
      {isChips ? (
        <>
          <GroupTitle name={group.name} count={group.chips.length} />
          <TagList tags={group.chips} variant="strong" />
        </>
      ) : (
        <>
          <GroupTitle name={group.name} count={group.items.length} />
          <ul className="grid gap-[0.9rem]">
            {group.items.map((item) => (
              <li key={item.name} className="grid grid-cols-[44px_1fr] items-center gap-[0.85rem]">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt=""
                    width={44}
                    height={44}
                    className="size-11 object-contain"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-md border border-line bg-surface-2 font-mono text-xs font-medium text-brand"
                  >
                    {initials(item.name)}
                  </span>
                )}
                <div>
                  <div className="leading-[1.25] font-semibold">{item.name}</div>
                  <div className="text-sm leading-[1.4] text-muted-foreground">{item.note}</div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export function Integrations() {
  return (
    <Section id="integracoes" title={integrations.title} intro={integrations.intro}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {integrations.groups.map((group) => (
          <Group key={group.name} group={group} />
        ))}
      </div>
    </Section>
  );
}

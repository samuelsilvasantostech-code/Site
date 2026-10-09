type SectionHeaderProps = {
  id: string;
  title: string;
  intro?: string;
};

/** Título de seção com o "nó" que se liga ao trilho do fluxo. */
export function SectionHeader({ id, title, intro }: SectionHeaderProps) {
  return (
    <header className="relative mb-[clamp(2rem,4vw,3rem)] max-w-[46rem]">
      <span className="sec-node" aria-hidden="true" />
      <h2 id={`${id}-title`} className="text-xl font-[650] tracking-[-0.025em] text-balance">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-[40rem] text-md text-pretty text-muted-foreground">{intro}</p>
      )}
    </header>
  );
}

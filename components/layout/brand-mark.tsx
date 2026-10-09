/** Monograma "SS" com a porta de conexão à direita. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={className}
      overflow="visible"
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="10"
        className="fill-surface stroke-line-strong"
        strokeWidth={1.5}
      />
      <text
        x="20"
        y="26.5"
        textAnchor="middle"
        className="fill-brand font-sans text-[17px] font-bold tracking-[-0.5px]"
      >
        SS
      </text>
      <circle cx="39" cy="20" r="3.5" className="fill-background stroke-brand" strokeWidth={2} />
    </svg>
  );
}

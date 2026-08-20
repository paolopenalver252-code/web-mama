type StatBlockProps = {
  value: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function StatBlock({ value, label, tone = "light", className = "" }: StatBlockProps) {
  const labelColor = tone === "dark" ? "text-white/60" : "text-ink/60";
  const valueColor = tone === "dark" ? "text-accent" : "text-accent-text";

  return (
    <div className={className}>
      <div className={`font-heading text-4xl sm:text-5xl ${valueColor}`}>{value}</div>
      <div className={`mt-1 text-sm uppercase tracking-[0.2em] ${labelColor}`}>{label}</div>
    </div>
  );
}

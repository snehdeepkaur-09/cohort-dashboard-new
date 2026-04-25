const riskStyles: Record<string, string> = {
  Low: "bg-risk-low/15 text-risk-low",
  Medium: "bg-risk-medium/15 text-risk-medium",
  High: "bg-risk-high/15 text-risk-high",
  Critical: "bg-risk-critical/15 text-risk-critical",
};

export function RiskBadge({ level }: { level: string | null }) {
  if (!level) return null;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${riskStyles[level] ?? ""}`}>
      {level}
    </span>
  );
}

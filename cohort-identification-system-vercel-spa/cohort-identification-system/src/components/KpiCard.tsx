import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  subtitle?: string;
}

export function KpiCard({ title, value, icon: Icon, color, subtitle }: KpiCardProps) {
  return (
    <div className="bg-card rounded-xl border p-5 flex items-start gap-4 shadow-sm">
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: color ? `${color}20` : "var(--accent)" }}
      >
        <Icon className="w-5 h-5" style={{ color: color || "var(--primary)" }} />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold mt-0.5" style={{ color: color || "var(--foreground)" }}>{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

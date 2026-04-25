import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCard } from "@/components/KpiCard";
import { cohortStats, riskDistribution } from "@/lib/mockData";
import { Users, AlertTriangle, ShieldAlert, BarChart3, ShieldCheck, ShieldX } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Cohort Identification System" },
      { name: "description", content: "Birmingham City Council cohort identification analytics dashboard" },
    ],
  }),
  component: DashboardHome,
});

const RISK_COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444"];

function DashboardHome() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Cohort identification and risk analysis summary</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard title="Total Residents" value={cohortStats.total} icon={Users} />
          <KpiCard title="ML Eligible" value={cohortStats.mlEligible} icon={ShieldCheck} color="#22c55e" subtitle="Consent granted" />
          <KpiCard title="Excluded" value={cohortStats.excluded} icon={ShieldX} color="#ef4444" subtitle="Consent denied" />
          <KpiCard title="High Risk" value={cohortStats.high} icon={AlertTriangle} color="#f97316" />
          <KpiCard title="Critical Risk" value={cohortStats.critical} icon={ShieldAlert} color="#ef4444" />
          <KpiCard title="Data Quality" value={`${cohortStats.dataQuality}%`} icon={BarChart3} color="#22c55e" subtitle="Completeness score" />
        </div>

        <div className="bg-accent/50 border border-accent rounded-lg px-4 py-3 text-sm text-muted-foreground">
          <strong className="text-foreground">GDPR Compliance Notice:</strong>{" "}
          Residents without explicit consent are excluded from ML predictions in compliance with UK GDPR and ethical guidelines.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">Risk Distribution (Consented Only)</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={riskDistribution} barSize={48}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {riskDistribution.map((_, i) => (
                    <Cell key={i} fill={RISK_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl border p-5 shadow-sm">
            <h2 className="text-sm font-semibold mb-4">Cohort Breakdown (Consented Only)</h2>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="count"
                  nameKey="name"
                  label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                  style={{ fontSize: 11 }}
                >
                  {riskDistribution.map((_, i) => (
                    <Cell key={i} fill={RISK_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { RiskBadge } from "@/components/RiskBadge";
import { ConsentBadge } from "@/components/ConsentBadge";
import { residents, type Resident } from "@/lib/mockData";
import { useState, useMemo } from "react";
import { Search, Filter, AlertCircle, CheckCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/cohorts")({
  head: () => ({
    meta: [
      { title: "Cohort Table — Cohort Identification System" },
      { name: "description", content: "View and filter at-risk residents by cohort" },
    ],
  }),
  component: CohortsPage,
});

const consentIcon: Record<Resident["consentStatus"], typeof CheckCircle> = {
  Granted: CheckCircle,
  Pending: Clock,
  Denied: AlertCircle,
};
const consentColor: Record<Resident["consentStatus"], string> = {
  Granted: "text-risk-low",
  Pending: "text-risk-medium",
  Denied: "text-risk-critical",
};

function CohortsPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [missingOnly, setMissingOnly] = useState(false);

  const sources = useMemo(() => [...new Set(residents.map(r => r.dataSource))].sort(), []);

  const filtered = useMemo(() => {
    return residents.filter((r) => {
      if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (riskFilter !== "All" && r.riskLevel !== riskFilter) return false;
      if (sourceFilter !== "All" && r.dataSource !== sourceFilter) return false;
      if (missingOnly && !r.missingData) return false;
      return true;
    });
  }, [search, riskFilter, sourceFilter, missingOnly]);

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Cohort Table</h1>
          <p className="text-sm text-muted-foreground mt-1">Browse and filter at-risk residents</p>
        </div>

        <div className="bg-card rounded-xl border shadow-sm">
          <div className="p-4 border-b flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                className="w-full pl-9 pr-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Search by name or ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select className="text-sm border rounded-md px-2 py-2 bg-background" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
                <option value="All">All Levels</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
              <select className="text-sm border rounded-md px-2 py-2 bg-background" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
                <option value="All">All Sources</option>
                {sources.map(s => <option key={s}>{s}</option>)}
              </select>
              <label className="flex items-center gap-1.5 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={missingOnly} onChange={(e) => setMissingOnly(e.target.checked)} className="rounded" />
                Missing data
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Risk Score</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Risk Level</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">ML Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Source</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Consent</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const ConsentIcon = consentIcon[r.consentStatus];
                  return (
                    <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                      <td className="px-4 py-3 font-medium">{r.name}</td>
                      <td className="px-4 py-3">
                        {r.riskScore !== null ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${r.riskScore}%`,
                                  backgroundColor: r.riskLevel === "Critical" ? "#ef4444" : r.riskLevel === "High" ? "#f97316" : r.riskLevel === "Medium" ? "#eab308" : "#22c55e",
                                }}
                              />
                            </div>
                            <span className="tabular-nums">{r.riskScore}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            {r.consentStatus === "Denied" ? "Excluded (No Consent)" : "Awaiting Consent"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {r.riskLevel ? (
                          <RiskBadge level={r.riskLevel} />
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <ConsentBadge status={r.mlEligibility} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{r.dataSource}</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 ${consentColor[r.consentStatus]}`}>
                          <ConsentIcon className="w-3.5 h-3.5" />
                          {r.consentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {r.missingData ? <span className="text-risk-high text-xs">⚠ Incomplete</span> : <span className="text-risk-low text-xs">✓ Complete</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-3 border-t text-xs text-muted-foreground">
            Showing {filtered.length} of {residents.length} residents
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

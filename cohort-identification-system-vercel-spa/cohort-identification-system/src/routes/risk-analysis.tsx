import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { RiskBadge } from "@/components/RiskBadge";
import { ConsentBadge } from "@/components/ConsentBadge";
import { residents } from "@/lib/mockData";
import { useState } from "react";
import { Brain, ChevronRight, ShieldAlert, Activity } from "lucide-react";

export const Route = createFileRoute("/risk-analysis")({
  head: () => ({
    meta: [
      { title: "Risk Analysis — Cohort Identification System" },
      { name: "description", content: "Detailed resident risk analysis and AI insights" },
    ],
  }),
  component: RiskAnalysisPage,
});

function RiskAnalysisPage() {
  const eligible = residents.filter(r => r.consentStatus === "Granted" && (r.riskLevel === "High" || r.riskLevel === "Critical"));
  const [selectedId, setSelectedId] = useState(eligible[0]?.id ?? "");
  const selected = residents.find(r => r.id === selectedId);

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Risk Analysis</h1>
          <p className="text-sm text-muted-foreground mt-1">Detailed view of individual resident risk profiles (consent-granted only)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-risk-critical" />
                High & Critical Risk (Consented)
              </h2>
            </div>
            <div className="divide-y max-h-[500px] overflow-y-auto">
              {eligible.length === 0 && (
                <p className="p-4 text-sm text-muted-foreground">No eligible residents found.</p>
              )}
              {eligible.slice(0, 15).map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors ${
                    selectedId === r.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiskBadge level={r.riskLevel} />
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            {selected ? (
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground">{selected.id} · {selected.dataSource}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ConsentBadge status={selected.mlEligibility} />
                    <RiskBadge level={selected.riskLevel} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Risk Score</p>
                    <div className="flex items-end gap-2 mt-1">
                      <span className="text-3xl font-bold">{selected.riskScore ?? "—"}</span>
                      {selected.riskScore !== null && <span className="text-sm text-muted-foreground mb-1">/ 100</span>}
                    </div>
                    {selected.riskScore !== null && (
                      <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${selected.riskScore}%`,
                            backgroundColor: selected.riskLevel === "Critical" ? "#ef4444" : selected.riskLevel === "High" ? "#f97316" : selected.riskLevel === "Medium" ? "#eab308" : "#22c55e",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Cohort Assignment</p>
                    <p className="text-lg font-bold mt-1">{selected.riskLevel ? `${selected.riskLevel} Risk` : "Not Assigned"}</p>
                    <p className="text-xs text-muted-foreground mt-1">Consent: {selected.consentStatus}</p>
                  </div>
                </div>

                {selected.factors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      Contributing Factors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.factors.map(f => (
                        <span key={f} className="text-xs bg-primary/8 text-primary border border-primary/15 rounded-md px-2.5 py-1">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" />
                    AI Insight
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.aiInsight}</p>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border shadow-sm p-6 text-center text-muted-foreground">
                Select a resident from the list to view their risk profile.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

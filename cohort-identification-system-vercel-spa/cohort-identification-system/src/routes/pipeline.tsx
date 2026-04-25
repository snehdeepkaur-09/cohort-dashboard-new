import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Database, FileSpreadsheet, Sparkles, BarChart3, Users, Monitor, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Data Pipeline — Cohort Identification System" },
      { name: "description", content: "System data flow and pipeline overview" },
    ],
  }),
  component: PipelinePage,
});

const steps = [
  { icon: FileSpreadsheet, title: "Data Sources", desc: "CSV, Excel, Council databases", status: "active" },
  { icon: Database, title: "Data Extraction", desc: "Automated ingestion pipeline", status: "active" },
  { icon: CheckCircle2, title: "Cleaning & Validation", desc: "Missing value imputation, deduplication", status: "active" },
  { icon: Sparkles, title: "ML Model Prediction", desc: "Risk scoring via trained model", status: "active" },
  { icon: BarChart3, title: "Risk Scoring", desc: "0–100 composite score generation", status: "active" },
  { icon: Users, title: "Cohort Generation", desc: "Low / Medium / High / Critical", status: "active" },
  { icon: Monitor, title: "Dashboard Output", desc: "Interactive visualisation & reporting", status: "active" },
];

function PipelinePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Data Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">End-to-end system flow from data ingestion to dashboard</p>
        </div>

        <div className="bg-card rounded-xl border p-8 shadow-sm">
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex flex-col items-center py-1">
                      <div className="w-0.5 h-6 bg-primary/20" />
                      <ArrowRight className="w-4 h-4 text-primary/40 rotate-90" />
                      <div className="w-0.5 h-2 bg-primary/20" />
                    </div>
                  )}
                </div>
                <div className="pt-2.5">
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

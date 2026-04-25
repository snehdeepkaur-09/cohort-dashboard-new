import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { Play, RefreshCw, CheckCircle2, AlertTriangle, Cpu, Activity } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Cohort Identification System" },
      { name: "description", content: "Model selection and system administration" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [model, setModel] = useState("random-forest");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRun = () => {
    setRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setRunning(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">System configuration and model management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border shadow-sm p-6 space-y-5">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              ML Model Configuration
            </h2>

            <div className="space-y-3">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Select Model</label>
              <div className="space-y-2">
                {[
                  { value: "logistic-regression", label: "Logistic Regression", desc: "Linear classifier, fast training" },
                  { value: "random-forest", label: "Random Forest", desc: "Ensemble method, high accuracy" },
                ].map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      model === opt.value ? "border-primary bg-primary/5" : "hover:bg-muted/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="model"
                      value={opt.value}
                      checked={model === opt.value}
                      onChange={() => setModel(opt.value)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleRun}
              disabled={running}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {running ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running Analysis…
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Analysis
                </>
              )}
            </button>

            {(running || progress >= 100) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Processing</span>
                  <span>{Math.min(100, Math.round(progress))}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-card rounded-xl border shadow-sm p-6 space-y-5">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              System Status
            </h2>

            <div className="space-y-3">
              {[
                { label: "Model Status", value: "Active", icon: CheckCircle2, color: "text-risk-low" },
                { label: "Last Training", value: "12 Apr 2026, 09:14", icon: RefreshCw, color: "text-primary" },
                { label: "Retraining", value: "Not required", icon: AlertTriangle, color: "text-risk-medium" },
                { label: "Data Pipeline", value: "Healthy", icon: CheckCircle2, color: "text-risk-low" },
                { label: "Records Processed", value: "14,832", icon: Activity, color: "text-primary" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`text-sm font-medium flex items-center gap-1.5 ${item.color}`}>
                    <item.icon className="w-3.5 h-3.5" />
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

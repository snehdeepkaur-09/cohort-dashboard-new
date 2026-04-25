import { DashboardSidebar } from "./DashboardSidebar";
import { Info } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b bg-card flex items-center justify-between px-6 shrink-0">
          <div />
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/60 px-3 py-1.5 rounded-md">
            <Info className="w-3.5 h-3.5" />
            All predictions are subject to human review to avoid bias and ensure ethical decision-making.
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

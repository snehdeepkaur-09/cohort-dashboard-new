import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  ShieldAlert,
  Settings,
  Building2,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Cohort Table", to: "/cohorts", icon: Users },
  { title: "Data Pipeline", to: "/pipeline", icon: GitBranch },
  { title: "Risk Analysis", to: "/risk-analysis", icon: ShieldAlert },
  { title: "Admin Panel", to: "/admin", icon: Settings },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shrink-0">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight">Cohort ID System</h1>
            <p className="text-xs text-sidebar-accent-foreground/60">Birmingham City Council</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-foreground/40 leading-relaxed">
          © 2026 Birmingham City Council
          <br />
          Cohort Identification System v2.1
        </p>
      </div>
    </aside>
  );
}

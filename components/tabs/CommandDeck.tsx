"use client";

import { Shield, Globe, TrendingUp, BarChart3, Zap, CheckCircle2, Clock3, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  {
    label: "Active Agents",
    value: "4",
    change: "+1",
    up: true,
    icon: Zap,
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.2)",
    sub: "All systems operational",
  },
  {
    label: "Tasks Completed",
    value: "8",
    change: "+3",
    up: true,
    icon: CheckCircle2,
    color: "#10b981",
    glow: "rgba(16,185,129,0.2)",
    sub: "Out of 12 today",
  },
  {
    label: "Pending Review",
    value: "3",
    change: "0",
    up: null,
    icon: Clock3,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
    sub: "Need your approval",
  },
  {
    label: "Alerts",
    value: "1",
    change: "-2",
    up: false,
    icon: AlertTriangle,
    color: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
    sub: "Low severity",
  },
];

const services = [
  { name: "Web Development",    icon: Globe,       color: "#06b6d4", projects: 3, revenue: "₹1.2L", status: "active" },
  { name: "Cyber Security",     icon: Shield,      color: "#8b5cf6", projects: 5, revenue: "₹2.8L", status: "active" },
  { name: "Market Research",    icon: BarChart3,   color: "#f59e0b", projects: 2, revenue: "₹40K",  status: "idle"   },
  { name: "Investment Services",icon: TrendingUp,  color: "#10b981", projects: 4, revenue: "₹90K",  status: "active" },
];

const activity = [
  { agent: "Ekya",         color: "#8b5cf6", action: "Android APK audit complete — 2 medium issues found",       time: "2m ago",  type: "success" },
  { agent: "Researcher",   color: "#f59e0b", action: "SIP data: HDFC Flexi Cap NAV ₹52.34 (+0.8% today)",       time: "14m ago", type: "info"    },
  { agent: "Coder",        color: "#10b981", action: "bugnbull.com portfolio section deployed successfully",      time: "31m ago", type: "success" },
  { agent: "Ekya",         color: "#8b5cf6", action: "Proposal drafted for client #8 — awaiting your approval",  time: "1h ago",  type: "warn"    },
  { agent: "Orchestrator", color: "#06b6d4", action: "Daily competitor intelligence sweep scheduled",             time: "2h ago",  type: "info"    },
];

const typeColor: Record<string, string> = {
  success: "#10b981",
  info:    "#06b6d4",
  warn:    "#f59e0b",
  error:   "#ef4444",
};

export default function CommandDeck() {
  return (
    <div className="space-y-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card group" style={{ boxShadow: `0 0 40px ${s.glow}` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              {s.up !== null && (
                <div className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-emerald-400" : "text-red-400"}`}>
                  {s.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {s.change}
                </div>
              )}
            </div>
            <div className="text-3xl font-bold tracking-tight mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-medium text-slate-300 mb-0.5">{s.label}</div>
            <div className="text-xs text-slate-600">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Services + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

        {/* Services — 2 cols */}
        <div className="xl:col-span-2 card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">BUGnBULL Services</h3>
            <span className="badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
              3 active
            </span>
          </div>
          <div className="space-y-2.5">
            {services.map((svc) => (
              <div key={svc.name} className="card-inner p-3.5 flex items-center gap-3 hover:border-white/10 transition-colors cursor-default">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}25` }}>
                  <svc.icon size={16} style={{ color: svc.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">{svc.name}</div>
                  <div className="text-xs text-slate-600">{svc.projects} projects · {svc.revenue}</div>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${svc.status === "active" ? "bg-emerald-400 pulse-green" : "bg-slate-600"}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Activity — 3 cols */}
        <div className="xl:col-span-3 card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Live Activity</h3>
            <span className="text-xs text-slate-600">Today</span>
          </div>
          <div className="space-y-1">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: typeColor[item.type] }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 leading-snug">{item.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium" style={{ color: item.color }}>{item.agent}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-600">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-5 space-y-3">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "New Security Report",   color: "#8b5cf6" },
            { label: "Add Client",            color: "#06b6d4" },
            { label: "Check SIP Performance", color: "#10b981" },
            { label: "Schedule Meeting",      color: "#f59e0b" },
            { label: "Run Recon Scan",        color: "#ef4444" },
            { label: "Push to GitHub",        color: "#64748b" },
          ].map((a) => (
            <button key={a.label}
              className="text-xs px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
              style={{ background: `${a.color}12`, color: a.color, border: `1px solid ${a.color}25` }}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

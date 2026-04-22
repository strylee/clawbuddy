"use client";

import { Shield, Globe, TrendingUp, BarChart3, Zap, CheckCircle2, Clock3, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { label: "Active Agents",    value: "4",  change: "+1", up: true,  icon: Zap,          color: "#8b5cf6", glow: "rgba(139,92,246,0.25)", sub: "All systems go"     },
  { label: "Tasks Completed",  value: "8",  change: "+3", up: true,  icon: CheckCircle2, color: "#10b981", glow: "rgba(16,185,129,0.2)",  sub: "Out of 12 today"    },
  { label: "Pending Review",   value: "3",  change: "—",  up: null,  icon: Clock3,       color: "#f59e0b", glow: "rgba(245,158,11,0.2)",  sub: "Need your approval" },
  { label: "Alerts",           value: "1",  change: "-2", up: false, icon: AlertTriangle,color: "#ef4444", glow: "rgba(239,68,68,0.18)",  sub: "Low severity"       },
];

const services = [
  { name: "Web Development",     icon: Globe,      color: "#06b6d4", projects: 3, revenue: "₹1.2L", pct: 68, status: "active" },
  { name: "Cyber Security",      icon: Shield,     color: "#8b5cf6", projects: 5, revenue: "₹2.8L", pct: 85, status: "active" },
  { name: "Market Research",     icon: BarChart3,  color: "#f59e0b", projects: 2, revenue: "₹40K",  pct: 40, status: "idle"   },
  { name: "Investment Services", icon: TrendingUp, color: "#10b981", projects: 4, revenue: "₹90K",  pct: 72, status: "active" },
];

const activity = [
  { agent: "Ekya",         color: "#8b5cf6", action: "Android APK audit complete — 2 medium issues found",     time: "2m ago",  type: "success" },
  { agent: "Researcher",   color: "#f59e0b", action: "SIP data: HDFC Flexi Cap NAV ₹52.34 (+0.8% today)",     time: "14m ago", type: "info"    },
  { agent: "Coder",        color: "#10b981", action: "bugnbull.com portfolio section deployed successfully",   time: "31m ago", type: "success" },
  { agent: "Ekya",         color: "#8b5cf6", action: "Proposal for client #8 — awaiting your approval",       time: "1h ago",  type: "warn"    },
  { agent: "Orchestrator", color: "#06b6d4", action: "Daily competitor intelligence sweep scheduled",          time: "2h ago",  type: "info"    },
];

const typeColor: Record<string, string> = {
  success: "#10b981", info: "#06b6d4", warn: "#f59e0b", error: "#ef4444",
};

const monthlyData = [
  { month: "Nov", rev: 65, tasks: 34 },
  { month: "Dec", rev: 78, tasks: 41 },
  { month: "Jan", rev: 90, tasks: 55 },
  { month: "Feb", rev: 72, tasks: 38 },
  { month: "Mar", rev: 105, tasks: 63 },
  { month: "Apr", rev: 118, tasks: 71 },
];
const maxRev = Math.max(...monthlyData.map(d => d.rev));

export default function CommandDeck() {
  return (
    <div className="space-y-5">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card" style={{ boxShadow: `0 8px 32px ${s.glow}` }}>
            <div className="flex items-start justify-between mb-5">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: `${s.color}20`, border: `1px solid ${s.color}35` }}>
                <s.icon size={20} style={{ color: s.color }} />
              </div>
              {s.up !== null && (
                <div className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg ${s.up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
                  {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {s.change}
                </div>
              )}
            </div>
            <div className="text-4xl font-black tracking-tight mb-1.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm font-semibold text-slate-200 mb-1">{s.label}</div>
            <div className="text-xs text-slate-600">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Row 2: Services + Activity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

        {/* Services */}
        <div className="xl:col-span-2 card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">BUGnBULL Services</h3>
            <span className="badge" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>3 active</span>
          </div>
          <div className="space-y-3">
            {services.map((svc) => (
              <div key={svc.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}28` }}>
                      <svc.icon size={15} style={{ color: svc.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200">{svc.name}</div>
                      <div className="text-xs text-slate-600">{svc.projects} projects · {svc.revenue}</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${svc.status === "active" ? "bg-emerald-400 pulse-green" : "bg-slate-600"}`} />
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${svc.pct}%`, background: `linear-gradient(90deg, ${svc.color}aa, ${svc.color})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="xl:col-span-3 card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Activity</h3>
            <span className="text-xs text-slate-600">Today</span>
          </div>
          <div className="space-y-0.5">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: typeColor[item.type] }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 leading-snug">{item.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold" style={{ color: item.color }}>{item.agent}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-600">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Chart + Quick Actions ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

        {/* Revenue Chart */}
        <div className="xl:col-span-3 card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Revenue (₹K)</h3>
            <span className="text-xs font-semibold text-emerald-400">+12.4% MoM ↑</span>
          </div>
          <div className="flex items-end gap-3 h-28">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-t-lg transition-all duration-700 relative group"
                  style={{ height: `${(d.rev / maxRev) * 100}%`, background: "linear-gradient(180deg, rgba(124,58,237,0.8), rgba(6,182,212,0.5))", minHeight: 8 }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{d.rev}K
                  </div>
                </div>
                <span className="text-xs text-slate-600">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + Today's Summary */}
        <div className="xl:col-span-2 space-y-4">
          <div className="card p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Security Report", color: "#8b5cf6" },
                { label: "Add Client",      color: "#06b6d4" },
                { label: "SIP Check",       color: "#10b981" },
                { label: "New Meeting",     color: "#f59e0b" },
                { label: "Recon Scan",      color: "#ef4444" },
                { label: "Git Push",        color: "#64748b" },
              ].map((a) => (
                <button key={a.label}
                  className="text-xs px-3 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 text-center"
                  style={{ background: `${a.color}14`, color: a.color, border: `1px solid ${a.color}28` }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Today's Summary</h3>
            {[
              { label: "Revenue Generated", value: "₹12,400", color: "#10b981" },
              { label: "Clients Contacted", value: "3",        color: "#06b6d4" },
              { label: "Reports Sent",      value: "1",        color: "#8b5cf6" },
              { label: "Uptime",            value: "99.1%",    color: "#f59e0b" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{row.label}</span>
                <span className="text-sm font-bold" style={{ color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

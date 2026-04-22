"use client";

import { MessageSquare, CheckCircle2, Clock, AlertOctagon } from "lucide-react";

const decisions = [
  {
    topic: "Client #8 — E-commerce site ka tight deadline accept karein?",
    status: "escalated",
    agents: ["Ekya", "Orchestrator"],
    summary: "Client 2 weeks mein full e-commerce site chahta hai. Coder ka estimate 3 weeks. Budget ₹45,000 — strong. Timeline conflict hai.",
    outcome: "Tanishk decision chahiye — deadline negotiate karein ya premium urgency charge lein?",
    time: "35m ago",
    votes: { yes: 1, no: 1 },
  },
  {
    topic: "New SIP client ke liye best mutual fund?",
    status: "resolved",
    agents: ["Ekya", "Researcher"],
    summary: "HDFC Flexi Cap, Mirae Asset Emerging, Parag Parikh Flexi Cap compare kiya. 3Y returns, expense ratio, risk profile sab check kiya.",
    outcome: "Parag Parikh Flexi Cap recommended — best long-term stability + global diversification. Report sent.",
    time: "2h ago",
    votes: { yes: 2, no: 0 },
  },
  {
    topic: "Web pentest ya API audit — is week priority?",
    status: "resolved",
    agents: ["Ekya", "Orchestrator", "Coder"],
    summary: "Do clients wait kar rahe hain. API audit deadline zyada close hai (3 days). Web pentest next week possible.",
    outcome: "API audit first. Web pentest rescheduled to next Monday.",
    time: "Yesterday",
    votes: { yes: 3, no: 0 },
  },
  {
    topic: "CVE-2025-1234 — client ko immediate patch alert bhejein?",
    status: "pending",
    agents: ["Ekya", "Researcher"],
    summary: "Node.js 20.x mein critical vuln. 2 clients affected. CVSS 7.2. Researcher patch severity assess kar raha hai.",
    outcome: null,
    time: "1h ago",
    votes: { yes: 1, no: 0 },
  },
];

const statusCfg = {
  resolved:  { icon: CheckCircle2, color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)",  label: "Resolved"        },
  pending:   { icon: Clock,         color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", label: "In Discussion"    },
  escalated: { icon: AlertOctagon,  color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.25)",  label: "Needs Tanishk ⚡" },
};

export default function Council() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="grad-border p-5">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare size={18} className="text-violet-400" />
          <h2 className="font-semibold text-slate-200">Agent Council</h2>
        </div>
        <p className="text-sm text-slate-500">
          Agents discuss aur decide karte hain internal tasks pe. <span className="text-red-400 font-medium">Escalated</span> items = tumhara input chahiye.
        </p>
      </div>

      {/* Decisions */}
      <div className="space-y-4">
        {decisions.map((d, i) => {
          const cfg = statusCfg[d.status as keyof typeof statusCfg];
          const Icon = cfg.icon;
          return (
            <div key={i} className="card p-5 space-y-4"
              style={d.status === "escalated" ? { borderColor: "rgba(239,68,68,0.2)", boxShadow: "0 0 30px rgba(239,68,68,0.08)" } : {}}>

              {/* Status + Topic */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-medium text-slate-200 leading-snug flex-1">{d.topic}</h3>
                <div className="flex items-center gap-1.5 flex-shrink-0 badge"
                  style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                  <Icon size={12} />
                  {cfg.label}
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-400 leading-relaxed">{d.summary}</p>

              {/* Outcome */}
              {d.outcome && (
                <div className="flex gap-2.5 p-3 rounded-xl text-sm"
                  style={{ background: `${cfg.color}08`, border: `1px solid ${cfg.color}20` }}>
                  <span style={{ color: cfg.color }}>→</span>
                  <span className="text-slate-300">{d.outcome}</span>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {d.agents.map((a) => (
                    <span key={a} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                      style={{ background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="text-emerald-500">✓ {d.votes.yes}</span>
                  {d.votes.no > 0 && <span className="text-red-500">✗ {d.votes.no}</span>}
                  <span>·</span>
                  <span>{d.time}</span>
                </div>
              </div>

              {/* CTA for escalated */}
              {d.status === "escalated" && (
                <div className="flex gap-2 pt-1">
                  <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors">
                    ✓ Approve
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:bg-white/[0.07] transition-colors">
                    Edit & Decide
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

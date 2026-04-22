"use client";

import { useState } from "react";
import { Terminal, Filter } from "lucide-react";

const logs = [
  { ts: "10:42:31", agent: "Ekya",         ac: "#8b5cf6", level: "SUCCESS", msg: "Android APK scan complete",                   detail: "2 medium-severity issues found in client-7.apk · OWASP Mobile M3, M5 · Report drafted." },
  { ts: "10:38:14", agent: "Orchestrator", ac: "#06b6d4", level: "INFO",    msg: "Spawning Researcher for market sweep",         detail: null },
  { ts: "10:35:02", agent: "Researcher",   ac: "#f59e0b", level: "INFO",    msg: "SIP data fetched: HDFC Flexi Cap ₹52.34 +0.8%",detail: null },
  { ts: "10:28:55", agent: "Coder",        ac: "#10b981", level: "SUCCESS", msg: "bugnbull.com deploy complete",                 detail: "Portfolio section updated · Build: 43s · No errors." },
  { ts: "10:15:20", agent: "Ekya",         ac: "#8b5cf6", level: "WARN",    msg: "External action blocked — awaiting approval",  detail: "Proposal email for client #8 ready. External send requires Tanishk approval." },
  { ts: "10:02:44", agent: "Ekya",         ac: "#8b5cf6", level: "INFO",    msg: "Heartbeat OK — all systems nominal",           detail: null },
  { ts: "09:55:11", agent: "Researcher",   ac: "#f59e0b", level: "WARN",    msg: "CVE-2025-1234 detected — affects client stack",detail: "Node.js 20.x — 2 clients affected. CVSS 7.2. Patch available." },
  { ts: "09:48:33", agent: "Coder",        ac: "#10b981", level: "SUCCESS", msg: "REST API security test — 0 critical findings", detail: "42 endpoints tested · 0 critical · 1 low (verbose errors) · Report attached." },
  { ts: "09:30:00", agent: "Ekya",         ac: "#8b5cf6", level: "INFO",    msg: "Session started — loading BUGnBULL context",  detail: null },
  { ts: "09:29:58", agent: "System",       ac: "#475569", level: "INFO",    msg: "Ollama online · gemma4:e2b ready at :11434",   detail: null },
];

const levelCfg: Record<string, { color: string; bg: string }> = {
  SUCCESS: { color: "#10b981", bg: "rgba(16,185,129,0.08)"  },
  INFO:    { color: "#06b6d4", bg: "rgba(6,182,212,0.06)"   },
  WARN:    { color: "#f59e0b", bg: "rgba(245,158,11,0.08)"  },
  ERROR:   { color: "#ef4444", bg: "rgba(239,68,68,0.08)"   },
};

const FILTERS = ["ALL", "SUCCESS", "WARN", "ERROR", "Ekya", "Researcher", "Coder"];

export default function AILog() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL"
    ? logs
    : logs.filter(l => l.level === filter || l.agent === filter);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="card p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm text-slate-300">
          <Terminal size={16} className="text-violet-400" />
          <span className="font-medium">Agent Activity Log</span>
          <span className="badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
            {filtered.length} entries
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Filter size={12} />
          <span>Click to expand</span>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className="text-xs px-3 py-1.5 rounded-lg border font-medium transition-all"
            style={filter === f
              ? { background: "rgba(139,92,246,0.2)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.4)" }
              : { background: "rgba(255,255,255,0.03)", color: "#475569", border: "1px solid rgba(255,255,255,0.07)" }
            }>
            {f}
          </button>
        ))}
      </div>

      {/* Log Lines */}
      <div className="card p-2 space-y-0.5">
        {filtered.map((log, i) => {
          const cfg = levelCfg[log.level] ?? levelCfg.INFO;
          const isOpen = expanded === i;
          return (
            <div key={i}>
              <div className="log-line cursor-pointer rounded-lg" style={isOpen ? { background: cfg.bg } : {}}
                onClick={() => setExpanded(isOpen ? null : i)}>
                <span className="text-slate-700 flex-shrink-0 tabular-nums">{log.ts}</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 tabular-nums"
                  style={{ background: `${cfg.color}15`, color: cfg.color, minWidth: 56, textAlign: "center" }}>
                  {log.level}
                </span>
                <span className="font-semibold flex-shrink-0" style={{ color: log.ac }}>
                  [{log.agent}]
                </span>
                <span className="text-slate-300 flex-1 truncate">{log.msg}</span>
                {log.detail && (
                  <span className="text-slate-700 flex-shrink-0 text-xs">{isOpen ? "▲" : "▼"}</span>
                )}
              </div>
              {isOpen && log.detail && (
                <div className="mx-3 mb-1 mt-0.5 pl-3 py-2 border-l-2 text-xs text-slate-500 leading-relaxed"
                  style={{ borderColor: cfg.color + "40" }}>
                  {log.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

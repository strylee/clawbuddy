"use client";

import { Mic, FileText, Clock, User, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const meetings = [
  {
    id: 1,
    title: "Security Audit Kickoff",
    client: "Client #4",
    date: "Today · 11:00 AM",
    duration: "32 min",
    status: "processed",
    sentiment: "positive",
    sentimentScore: 82,
    summary: "Client ne Android APK audit ka scope confirm kiya. Budget ₹18,000 approved. Timeline 7 days. Specifically OWASP Mobile Top 10 coverage maanga.",
    actions: [
      { done: false, text: "APK file aur source code access request karo" },
      { done: false, text: "NDA sign karwao" },
      { done: true,  text: "Day 4 mid-audit check-in schedule karo" },
    ],
    tags: ["Cyber Sec", "Android", "₹18K"],
  },
  {
    id: 2,
    title: "SIP Portfolio Review",
    client: "Client #6",
    date: "Today · 9:30 AM",
    duration: "18 min",
    status: "processed",
    sentiment: "positive",
    sentimentScore: 91,
    summary: "6-month SIP performance review. Client very happy — Parag Parikh +14.2% CAGR. Monthly SIP ₹5K se ₹10K increase karna chahta hai.",
    actions: [
      { done: false, text: "SIP increase ke amendment documents prepare karo" },
      { done: false, text: "Updated portfolio projection email karo" },
    ],
    tags: ["Invest", "SIP", "₹10K/mo"],
  },
  {
    id: 3,
    title: "Web Dev Project Discussion",
    client: "Client #8",
    date: "Yesterday · 4:00 PM",
    duration: "45 min",
    status: "processed",
    sentiment: "neutral",
    sentimentScore: 61,
    summary: "E-commerce site requirements discuss ki. Full-stack + payment gateway. Timeline conflict — client wants 2 weeks, hum estimate 3 weeks kar rahe hain.",
    actions: [
      { done: true,  text: "Revised timeline proposal prepare karo" },
      { done: false, text: "Tanishk se negotiation strategy approve karwao" },
      { done: false, text: "Technical requirements doc send karo" },
    ],
    tags: ["Web Dev", "E-commerce", "₹45K"],
  },
  {
    id: 4,
    title: "API Security Debrief",
    client: "Client #5",
    date: "Tomorrow · 3:00 PM",
    duration: "—",
    status: "upcoming",
    sentiment: "neutral",
    sentimentScore: null,
    summary: null,
    actions: [],
    tags: ["Cyber Sec", "API"],
  },
];

const sentimentColor = (score: number | null) => {
  if (!score) return "#475569";
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
};

const statusCfg: Record<string, { color: string; bg: string; label: string }> = {
  processed: { color: "#10b981", bg: "rgba(16,185,129,0.1)",  label: "Processed" },
  upcoming:  { color: "#475569", bg: "rgba(71,85,105,0.1)",   label: "Upcoming"  },
  processing:{ color: "#06b6d4", bg: "rgba(6,182,212,0.1)",   label: "Processing"},
};

export default function MeetingIntel() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mic size={17} className="text-violet-400" />
          <div>
            <div className="text-sm font-semibold text-slate-200">Meeting Intelligence</div>
            <div className="text-xs text-slate-600">Ekya auto-processes transcripts → extracts summaries & action items</div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30 px-4 py-2 rounded-xl hover:bg-violet-500/25 transition-colors">
          <Mic size={12} />
          New Meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Meetings This Week", value: "4",   color: "#8b5cf6" },
          { label: "Actions Extracted",  value: "9",   color: "#06b6d4" },
          { label: "Avg Sentiment",      value: "78%", color: "#10b981" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Meeting Cards */}
      <div className="space-y-3">
        {meetings.map((m) => {
          const cfg = statusCfg[m.status];
          const isOpen = expanded === m.id;
          const sc = sentimentColor(m.sentimentScore);

          return (
            <div key={m.id} className="card overflow-hidden">
              {/* Card Header — always visible */}
              <div className="p-5 flex items-start justify-between cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : m.id)}>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-sm font-semibold text-slate-200">{m.title}</h3>
                    {m.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-500 border border-white/[0.07]">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><User size={11} />{m.client}</span>
                    <span className="flex items-center gap-1.5"><Clock size={11} />{m.date}</span>
                    {m.duration !== "—" && <span>{m.duration}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  {m.sentimentScore && (
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: sc }}>
                      <TrendingUp size={12} />
                      {m.sentimentScore}%
                    </div>
                  )}
                  <span className="badge" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                    {cfg.label}
                  </span>
                  {m.summary && (isOpen ? <ChevronUp size={14} className="text-slate-600" /> : <ChevronDown size={14} className="text-slate-600" />)}
                </div>
              </div>

              {/* Expanded Content */}
              {isOpen && m.summary && (
                <div className="px-5 pb-5 space-y-4 border-t border-white/[0.05] pt-4">
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <FileText size={11} />
                      AI Summary
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{m.summary}</p>
                  </div>

                  {/* Action Items */}
                  {m.actions.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Action Items ({m.actions.filter(a => !a.done).length} pending)
                      </div>
                      <div className="space-y-2">
                        {m.actions.map((action, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${action.done ? "bg-emerald-500/20 border border-emerald-500/40" : "border border-white/[0.15]"}`}>
                              {action.done && <span className="text-xs text-emerald-400">✓</span>}
                            </div>
                            <span className={action.done ? "line-through text-slate-600" : "text-slate-300"}>{action.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isOpen && m.status === "upcoming" && (
                <div className="px-5 pb-5 pt-4 border-t border-white/[0.05] text-sm text-slate-600 italic">
                  Transcript will be auto-processed after the meeting ends.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

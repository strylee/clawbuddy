"use client";

import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";

type Task = { id: string; title: string; agent: string; service: string; priority: "high" | "med" | "low"; tag?: string; };
type Col  = { id: string; label: string; color: string; accent: string; tasks: Task[]; };

const svcColor: Record<string, string> = {
  "Cyber Sec": "#8b5cf6",
  "Web Dev":   "#06b6d4",
  "Research":  "#f59e0b",
  "Invest":    "#10b981",
};

const priConfig = {
  high: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "High" },
  med:  { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Med"  },
  low:  { color: "#64748b", bg: "rgba(100,116,139,0.12)", label: "Low" },
};

const cols: Col[] = [
  {
    id: "todo", label: "To Do", color: "#475569", accent: "rgba(71,85,105,0.2)",
    tasks: [
      { id: "t1", title: "Android APK security audit — client #7",  agent: "Ekya",       service: "Cyber Sec", priority: "high" },
      { id: "t2", title: "Portfolio page redesign for bugnbull.com", agent: "Coder",      service: "Web Dev",   priority: "med"  },
      { id: "t3", title: "Nifty 50 SIP Q2 performance report",       agent: "Researcher", service: "Invest",    priority: "low"  },
    ],
  },
  {
    id: "doing", label: "In Progress", color: "#3b82f6", accent: "rgba(59,130,246,0.2)",
    tasks: [
      { id: "t4", title: "REST API security testing — 42 endpoints", agent: "Ekya",  service: "Cyber Sec", priority: "high", tag: "🔥 Hot" },
      { id: "t5", title: "E-commerce landing page — client #3",      agent: "Coder", service: "Web Dev",   priority: "med"  },
    ],
  },
  {
    id: "input", label: "Needs Input", color: "#f59e0b", accent: "rgba(245,158,11,0.2)",
    tasks: [
      { id: "t6", title: "Security report final — awaiting your review before sending", agent: "Ekya", service: "Cyber Sec", priority: "high", tag: "👀 You" },
    ],
  },
  {
    id: "canceled", label: "Canceled", color: "#ef4444", accent: "rgba(239,68,68,0.15)",
    tasks: [
      { id: "t7", title: "Old competitor research — outdated scope", agent: "Researcher", service: "Research", priority: "low" },
    ],
  },
  {
    id: "done", label: "Done", color: "#10b981", accent: "rgba(16,185,129,0.2)",
    tasks: [
      { id: "t8",  title: "Web vulnerability scan — client #2",             agent: "Ekya",       service: "Cyber Sec", priority: "high" },
      { id: "t9",  title: "Mutual fund comparison: HDFC vs Mirae vs PP",    agent: "Researcher", service: "Invest",    priority: "med"  },
      { id: "t10", title: "React portfolio site — client #1 delivered",     agent: "Coder",      service: "Web Dev",   priority: "med"  },
    ],
  },
];

function TaskCard({ task }: { task: Task }) {
  const pri = priConfig[task.priority];
  const svc = svcColor[task.service] ?? "#64748b";
  return (
    <div className="card-inner p-3.5 space-y-3 hover:border-white/10 transition-all cursor-pointer group">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-slate-200 leading-relaxed flex-1">{task.title}</p>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-slate-400 flex-shrink-0">
          <MoreHorizontal size={13} />
        </button>
      </div>
      {task.tag && (
        <span className="text-xs text-amber-400 font-medium">{task.tag}</span>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-0.5 rounded-md font-medium" style={{ background: `${svc}15`, color: svc }}>
          {task.service}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ background: pri.bg, color: pri.color }}>
            {pri.label}
          </span>
        </div>
      </div>
      <div className="text-xs text-slate-600">{task.agent}</div>
    </div>
  );
}

export default function TaskBoard() {
  const [columns] = useState<Col[]>(cols);

  const total = columns.reduce((s, c) => s + c.tasks.length, 0);
  const done  = columns.find(c => c.id === "done")?.tasks.length ?? 0;

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="card p-4 flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
          <span className="text-slate-400">{total} total tasks</span>
          <div className="h-4 w-px bg-white/[0.08]" />
          <span className="text-emerald-400 font-medium">{done} completed today</span>
          <div className="h-4 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all" style={{ width: `${(done / total) * 100}%` }} />
            </div>
            <span className="text-xs text-slate-600">{Math.round((done / total) * 100)}%</span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-violet-400 border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 rounded-lg hover:bg-violet-500/20 transition-colors">
          <Plus size={13} />
          Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {columns.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-60 space-y-3">
            {/* Column header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
                <span className="text-xs font-semibold text-slate-300">{col.label}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/[0.06] text-slate-500 font-medium">
                  {col.tasks.length}
                </span>
              </div>
              <button className="text-slate-700 hover:text-slate-500 transition-colors">
                <Plus size={13} />
              </button>
            </div>

            {/* Column body */}
            <div className="kanban-col space-y-2.5" style={{ borderColor: `${col.color}20` }}>
              {col.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {col.tasks.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-700">Empty</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

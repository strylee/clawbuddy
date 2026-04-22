"use client";

const agents = [
  {
    id: "ekya",
    emoji: "⚡",
    name: "Ekya",
    role: "Primary Agent & Company Manager",
    model: "claude-opus-4-7",
    provider: "Anthropic",
    status: "active",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.25)",
    tasks: 8,
    uptime: "99.2%",
    tokensToday: "124K",
    desc: "BUGnBULL ka dimaag. Clients manage karta hai, security reports banata hai, Tanishk ka personal assistant hai. Hinglish samajhta hai.",
    skills: ["Client Mgmt", "Security Reports", "Task Routing", "Hinglish", "Email Drafts", "Decision Making"],
  },
  {
    id: "orchestrator",
    emoji: "🧠",
    name: "Orchestrator",
    role: "Multi-Agent Coordinator",
    model: "claude-sonnet-4-6",
    provider: "Anthropic",
    status: "active",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.25)",
    tasks: 3,
    uptime: "97.8%",
    tokensToday: "56K",
    desc: "Complex kaam ke liye Researcher aur Coder ko spawn karta hai. Multi-step workflows coordinate karta hai.",
    skills: ["Agent Spawning", "Task Delegation", "Workflow Design", "Priority Routing"],
  },
  {
    id: "researcher",
    emoji: "🔍",
    name: "Researcher",
    role: "Intelligence & Research Agent",
    model: "llama-3.3-70b",
    provider: "Groq",
    status: "idle",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    tasks: 1,
    uptime: "94.1%",
    tokensToday: "38K",
    desc: "Market intel, CVE tracking, SIP/MF data, competitor analysis — sab kuch research karta hai quickly.",
    skills: ["Web Research", "CVE Tracking", "Market Data", "SIP Analysis", "Report Drafting"],
  },
  {
    id: "coder",
    emoji: "💻",
    name: "Coder",
    role: "Development & Automation Agent",
    model: "claude-sonnet-4-6",
    provider: "Anthropic",
    status: "active",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    tasks: 4,
    uptime: "98.5%",
    tokensToday: "89K",
    desc: "Web apps, security tools, automation scripts — BUGnBULL ke sare development kaam handle karta hai.",
    skills: ["Web Dev", "API Testing", "Android Sec", "Security Tools", "Automation", "Next.js"],
  },
];

export default function AgentProfiles() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {agents.map((agent) => (
        <div key={agent.id} className="card p-6 space-y-5 hover:translate-y-[-2px] transition-all duration-300"
          style={{ boxShadow: agent.status === "active" ? `0 0 40px ${agent.color}18` : "none" }}>

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: agent.bg, border: `1px solid ${agent.border}` }}>
                  {agent.emoji}
                </div>
                <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#050508] ${agent.status === "active" ? "bg-emerald-400 pulse-green" : "bg-slate-600"}`} />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-100">{agent.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{agent.role}</div>
              </div>
            </div>
            <div className={`badge ${agent.status === "active" ? "" : "opacity-60"}`}
              style={{ background: `${agent.color}15`, color: agent.color, border: `1px solid ${agent.color}30` }}>
              <span className={`w-1.5 h-1.5 rounded-full`} style={{ background: agent.color }} />
              {agent.status}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed">{agent.desc}</p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tasks",        value: String(agent.tasks) },
              { label: "Uptime",       value: agent.uptime },
              { label: "Tokens Today", value: agent.tokensToday },
            ].map((s) => (
              <div key={s.label} className="card-inner p-3 text-center">
                <div className="text-base font-bold" style={{ color: agent.color }}>{s.value}</div>
                <div className="text-xs text-slate-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Model */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Model</span>
            <div className="flex items-center gap-2">
              <span className="badge" style={{ background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}>
                {agent.provider}
              </span>
              <code className="text-slate-400 font-mono">{agent.model}</code>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.map((skill) => (
              <span key={skill} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ background: `${agent.color}12`, color: agent.color, border: `1px solid ${agent.color}20` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

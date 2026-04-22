"use client";

import { useState } from "react";
import { LayoutDashboard, Users, Kanban, ScrollText, Brain, Video, Wifi, Bell, Settings, ChevronRight } from "lucide-react";
import CommandDeck from "@/components/tabs/CommandDeck";
import AgentProfiles from "@/components/tabs/AgentProfiles";
import TaskBoard from "@/components/tabs/TaskBoard";
import AILog from "@/components/tabs/AILog";
import Council from "@/components/tabs/Council";
import MeetingIntel from "@/components/tabs/MeetingIntel";

const tabs = [
  { id: "command",  label: "Command Deck",   icon: LayoutDashboard },
  { id: "agents",   label: "Agent Profiles", icon: Users },
  { id: "tasks",    label: "Task Board",     icon: Kanban },
  { id: "log",      label: "AI Log",         icon: ScrollText },
  { id: "council",  label: "Council",        icon: Brain },
  { id: "meetings", label: "Meetings",       icon: Video },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("command");

  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <div className="layout">
      {/* Background blobs */}
      <div className="bg-blobs"><div className="bg-blob3" /></div>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 border-b border-white/[0.06]"
        style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(24px)" }}>

        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="grad-border w-9 h-9 flex items-center justify-center text-lg glow-purple">⚡</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base grad-text">ClawBuddy</span>
              <span className="badge" style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}>
                BETA
              </span>
            </div>
            <div className="text-xs text-slate-600">BUGnBULL Mission Control</div>
          </div>
        </div>

        {/* Center: Live indicators */}
        <div className="hidden md:flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-green" />
            <span className="text-emerald-400 font-medium">Ekya Online</span>
          </div>
          <div className="h-4 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Wifi size={12} />
            <span>Ollama · gemma4:e2b</span>
          </div>
          <div className="h-4 w-px bg-white/[0.08]" />
          <span className="text-slate-600">IST {now}</span>
        </div>

        {/* Right: User */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-slate-500 hover:text-slate-300">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-slate-500 hover:text-slate-300">
            <Settings size={16} />
          </button>
          <div className="flex items-center gap-2.5 pl-3 border-l border-white/[0.08]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-violet-300 glow-purple"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.4), rgba(6,182,212,0.2))", border: "1px solid rgba(139,92,246,0.4)" }}>
              T
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-medium text-slate-200">Tanishk</div>
              <div className="text-xs text-slate-600">Founder</div>
            </div>
          </div>
        </div>
      </header>

      {/* ── TABS ── */}
      <nav className="flex overflow-x-auto border-b border-white/[0.06] px-4"
        style={{ background: "rgba(5,5,8,0.6)", backdropFilter: "blur(12px)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ── BREADCRUMB ── */}
      <div className="px-6 py-2.5 flex items-center gap-2 text-xs text-slate-600">
        <span>BUGnBULL</span>
        <ChevronRight size={12} />
        <span className="text-slate-400">{tabs.find(t => t.id === activeTab)?.label}</span>
      </div>

      {/* ── CONTENT ── */}
      <main className="flex-1 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === "command"  && <CommandDeck />}
          {activeTab === "agents"   && <AgentProfiles />}
          {activeTab === "tasks"    && <TaskBoard />}
          {activeTab === "log"      && <AILog />}
          {activeTab === "council"  && <Council />}
          {activeTab === "meetings" && <MeetingIntel />}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05] px-6 py-2.5 flex items-center justify-between text-xs text-slate-700"
        style={{ background: "rgba(5,5,8,0.8)" }}>
        <div className="flex items-center gap-4">
          <span>⚡ Ekya v1.0</span>
          <span className="text-white/[0.08]">·</span>
          <span>OpenClaw 2026.4.15</span>
          <span className="text-white/[0.08]">·</span>
          <span>Next.js 16</span>
        </div>
        <a href="https://bugnbull.com" target="_blank" className="hover:text-slate-400 transition-colors">bugnbull.com ↗</a>
      </footer>
    </div>
  );
}

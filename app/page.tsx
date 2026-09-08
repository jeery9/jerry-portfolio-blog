"use client";
import React, { useState } from "react";
import { BookOpen, Video, Quote, User, MessageSquare, Globe } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-emerald-500 selection:text-neutral-950">
      
      {/* Executive Sidebar Navigation */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-900/50 backdrop-blur-md flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              Jerry DevOp
            </h1>
          </div>
          
          <nav className="space-y-1">
            {[
              { id: "portfolio", label: "Executive Profile", icon: User },
              { id: "blog", label: "Insights & Blog", icon: BookOpen },
              { id: "media", label: "Reels & Motivation", icon: Video },
              { id: "daily", label: "Verses & Quotes", icon: Quote },
              { id: "community", label: "Global Hub", icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-neutral-800 text-emerald-400 font-semibold shadow-inner border border-neutral-700/50"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex items-center gap-3 px-2 text-xs text-neutral-500">
          <Globe className="h-4 w-4 text-emerald-600" />
          <span>Connecting Globally & Locally</span>
        </div>
      </aside>

      {/* Main Dynamic Content Canvas */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-neutral-900 to-neutral-950 p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Active Component View Rendering */}
          {activeTab === "portfolio" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-neutral-800 pb-6">
                <span className="text-xs uppercase tracking-widest text-emerald-500 font-mono">Portfolio</span>
                <h2 className="text-3xl font-extrabold tracking-tight mt-1 text-white">Jerry DevOp</h2>
                <p className="text-neutral-400 mt-2 text-lg leading-relaxed">
                  Digital Creator & Developer. Building cross-platform pipelines to inspire, challenge, and connect individuals globally.
                </p>
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-white">Latest Insights</h2>
              <p className="text-neutral-400">Your upcoming writing engine will load your full executive content postings here.</p>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-white">Motivational Reels & Video Content</h2>
              <p className="text-neutral-400">Streamed video cells hosted globally will load interactive content components right here.</p>
            </div>
          )}

          {activeTab === "daily" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-white">Daily Bread & Wisdom</h2>
              <p className="text-neutral-400">Your selected Bible Verses and foundational philosophical quotes curated seamlessly.</p>
            </div>
          )}

          {activeTab === "community" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-white">Global Community Interactive Hub</h2>
              <p className="text-neutral-400">Live community interaction portal powered directly by Supabase cloud mechanics.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

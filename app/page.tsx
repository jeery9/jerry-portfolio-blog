"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { BookOpen, Video, Quote, User, MessageSquare, Globe, ArrowRight, Play, Heart, Menu, X } from "lucide-react";

// 1. Strict Supabase Client Configuration Guard
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Critical Configuration Error: Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dynamic state container initialized with default fallback bounds
  const [wisdom, setWisdom] = useState({
    verse: "Loading daily bread...",
    reference: "...",
    quote: "Loading wisdom profile...",
    author: "..."
  });

  const blogPosts = [
    { id: "modern-developer-shift", title: "The Modern Developer Shift", date: "Sep 8, 2026", readTime: "4 min read", snippet: "How terminal-driven building changes the pace of rapid cross-platform deployment..." },
    { id: "curating-digital-architecture", title: "Curating Digital Architecture", date: "Sep 5, 2026", readTime: "6 min read", snippet: "Designing minimalist interfaces that command authority while serving high-bandwidth media seamlessly..." }
  ];

  // 2. Optimized & Safe Data-Fetching Hook
  useEffect(() => {
    let isMounted = true;

    async function fetchDailyWisdom() {
      try {
        const { data, error } = await supabase
          .from("daily_wisdom")
          .select("*")
          .order("id", { ascending: false }) // Fallback sequencing, targeting custom timestamp fields next
          .maybeSingle(); // Safe structural evaluation for 0 or 1 rows

        if (error) {
          console.error("Supabase engine error:", error.message);
          return;
        }

        if (isMounted && data) {
          setWisdom({
            verse: data.verse || "No scripture entry targeted for today.",
            reference: data.reference || "Reference Missing",
            quote: data.quote || "No core vector profile set.",
            author: data.author || "Anonymous"
          });
        }
      } catch (err) {
        console.error("Cross-origin connection failure:", err);
      }
    }

    fetchDailyWisdom();

    return () => {
      isMounted = false; // Cancels state updates if unmounted while the asynchronous request evaluates
    };
  }, []);

  const navItems = [
    { id: "portfolio", label: "Executive Profile", icon: User },
    { id: "blog", label: "Insights & Blog", icon: BookOpen },
    { id: "media", label: "Reels & Motivation", icon: Video },
    { id: "daily", label: "Verses & Quotes", icon: Quote },
    { id: "community", label: "Global Hub", icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-emerald-500 selection:text-neutral-950 overflow-hidden">
      
      {/* Mobile Header Bar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-neutral-900 border-b border-neutral-800 z-50">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold tracking-tight text-sm">JERRY DEVOP</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-neutral-400 hover:text-white focus:outline-none">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Responsive Sidebar Component */}
      <aside className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 border-r border-neutral-800 bg-neutral-900/90 md:bg-neutral-900/50 backdrop-blur-md flex flex-col justify-between p-6 z-40 h-full pt-20 md:pt-6`}>
        <div>
          <div className="hidden md:flex items-center gap-3 mb-10 px-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              JERRY DEVOP
            </h1>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
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

      {/* Main Content Viewport Area */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-neutral-900 to-neutral-950 p-4 sm:p-6 lg:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Executive Profile Component */}
          {activeTab === "portfolio" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-neutral-800 pb-6">
                <span className="text-xs uppercase tracking-widest text-emerald-500 font-mono">Portfolio</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">Jerry DevOp</h2>
                <p className="text-neutral-400 mt-2 text-base sm:text-lg leading-relaxed">
                  Digital Creator & Developer. Building cross-platform pipelines to inspire, challenge, and connect individuals globally.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-neutral-900/60 rounded-xl border border-neutral-800/80">
                  <h3 className="font-semibold text-white mb-2">Global Vision</h3>
                  <p className="text-sm text-neutral-400">Deploying cloud-native architecture to host corporate blog feeds, content streaming panels, and interactive chat matrix hubs globally.</p>
                </div>
                <div className="p-6 bg-neutral-900/60 rounded-xl border border-neutral-800/80">
                  <h3 className="font-semibold text-white mb-2">Technical Core</h3>
                  <p className="text-sm text-neutral-400">Engineered with Next.js frameworks, styled via fluid utility layout arrays, and scaling dynamically with PostgreSQL cloud foundations.</p>
                </div>
              </div>
            </div>
          )}

          {/* Insights & Blog Component via Next.js Routes */}
          {activeTab === "blog" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-500 font-mono">Publications</span>
                <h2 className="text-2xl font-bold text-white mt-1">Latest Insights</h2>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id} className="group block p-6 bg-neutral-900/40 hover:bg-neutral-900/80 rounded-xl border border-neutral-800 transition-all">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <h3 className="text-lg font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors">{post.title}</h3>
                      <span className="text-xs text-neutral-500 whitespace-nowrap">{post.date}</span>
                    </div>
                    <p className="text-sm text-neutral-400 mt-2">{post.snippet}</p>
                    <div className="flex items-center gap-2 mt-4 text-xs font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Read Article</span> <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Video / Reels Component Layout Array */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-500 font-mono">Streaming Room</span>
                <h2 className="text-2xl font-bold text-white mt-1">Motivational Reels</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="relative aspect-[9/16] bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-center group overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-colors" />

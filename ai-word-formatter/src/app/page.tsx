"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  LayoutTemplate,
  Palette,
  Type,
  MonitorSmartphone,
  Send,
  Code2,
  RefreshCw
} from "lucide-react";

// Fallback for Github icon if not available in current lucide-react version
const Github = ({ size, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

type Stage = "input" | "generating" | "preview" | "deploying" | "deployed";

export default function NoCodeBuilder() {
  const [stage, setStage] = useState<Stage>("input");
  const [idea, setIdea] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [loadingText, setLoadingText] = useState("Analyzing your idea...");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "I've built the initial version based on your idea. What would you like to tweak?" }
  ]);

  // Handle generation flow
  const handleGenerate = () => {
    if (!idea.trim()) return;
    setStage("generating");

    // Simulate generation steps
    setTimeout(() => setLoadingText("Designing clean minimalist UI..."), 1500);
    setTimeout(() => setLoadingText("Writing components..."), 3000);
    setTimeout(() => setLoadingText("Setting up routing..."), 4500);
    setTimeout(() => setStage("preview"), 6000);
  };

  const handleDeploy = () => {
    setStage("deploying");
    setTimeout(() => setStage("deployed"), 3000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatHistory([...chatHistory, { role: "user", content: chatInput }]);
    setChatInput("");

    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: "assistant",
        content: "I've updated the UI based on your request. Check the preview!"
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">

      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm text-white">
            <Sparkles size={16} />
          </div>
          <span className="font-semibold text-slate-800 tracking-tight text-lg">Builder<span className="text-blue-600">AI</span></span>
        </div>

        {stage === "preview" && (
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100">
              <Code2 size={16} /> Export Code
            </button>
            <button
              onClick={handleDeploy}
              className="flex items-center gap-2 text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all shadow-sm active:scale-95"
            >
              <Github size={16} /> Deploy to GitHub
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        <AnimatePresence mode="wait">

          {/* Stage 1: Input */}
          {stage === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="flex-1 flex flex-col items-center justify-center p-6 max-w-3xl mx-auto w-full"
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                  What do you want to build?
                </h1>
                <p className="text-lg text-slate-500">
                  Describe your idea, and our AI will generate a beautiful, clean, minimalist website.
                </p>
              </div>

              <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. A portfolio for a landscape photographer featuring a masonry gallery and a contact form..."
                  className="w-full h-40 p-6 resize-none outline-none text-slate-700 text-lg placeholder:text-slate-400 bg-transparent"
                  autoFocus
                />
                <div className="bg-slate-50 border-t border-slate-100 p-3 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Layout Templates">
                      <LayoutTemplate size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Color Palette">
                      <Palette size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Typography">
                      <Type size={18} />
                    </button>
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={!idea.trim()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow active:scale-95"
                  >
                    Generate UI <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500"/> Clean Code</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500"/> Minimalist UI</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500"/> Responsive</span>
              </div>
            </motion.div>
          )}

          {/* Stage 2: Generating */}
          {stage === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-6 w-full absolute inset-0 bg-[#fafafa]/80 backdrop-blur-sm z-50"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center max-w-sm w-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl animate-pulse"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white relative shadow-lg">
                    <Loader2 size={32} className="animate-spin" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Building your app</h3>
                <p className="text-slate-500 text-center animate-pulse">{loadingText}</p>

                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Stage 3: Preview & Editing */}
          {stage === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              className="flex-1 flex w-full h-full"
            >
              {/* Left Sidebar: AI Chat / Controls */}
              <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-500" /> AI Assistant
                  </h2>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-700 rounded-bl-none'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-slate-100">
                  <form onSubmit={handleChatSubmit} className="relative">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask to change colors, layout..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Side: Live Preview Area */}
              <div className="flex-1 bg-[#f1f5f9] flex flex-col relative overflow-hidden">
                {/* Preview Toolbar */}
                <div className="h-12 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-center gap-4 px-4 sticky top-0 z-10">
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button className="px-3 py-1 bg-white shadow-sm rounded-md text-slate-700"><MonitorSmartphone size={16}/></button>
                    <button className="px-3 py-1 text-slate-500 hover:text-slate-700"><MonitorSmartphone size={16} className="rotate-90"/></button>
                  </div>
                  <div className="w-[1px] h-4 bg-slate-300"></div>
                  <button className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"><RefreshCw size={14}/> Refresh</button>
                </div>

                {/* The Mock App Preview */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
                  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden min-h-[800px] flex flex-col">

                    {/* Mock Website Header */}
                    <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8">
                      <div className="text-xl font-bold tracking-tighter text-slate-900">YourApp.</div>
                      <div className="flex gap-6 text-sm font-medium text-slate-500">
                        <span className="text-slate-900">Home</span>
                        <span>Features</span>
                        <span>About</span>
                        <span>Contact</span>
                      </div>
                      <div className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-medium">Get Started</div>
                    </div>

                    {/* Mock Website Hero */}
                    <div className="flex-1 p-16 flex flex-col items-center text-center justify-center">
                      <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
                        ✨ Generated specifically for you
                      </div>
                      <h1 className="text-6xl font-bold tracking-tight text-slate-900 mb-6 max-w-3xl leading-tight">
                        {idea ? (idea.length > 50 ? idea.substring(0, 50) + "..." : idea) : "A beautiful, minimalist design for your next big idea."}
                      </h1>
                      <p className="text-xl text-slate-500 mb-10 max-w-2xl">
                        This is a live preview of your generated application. It features a clean, airy design language with ample whitespace and crisp typography.
                      </p>
                      <div className="flex gap-4">
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium text-lg hover:bg-blue-700 transition-colors shadow-sm">
                          Start Building
                        </button>
                        <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-medium text-lg hover:border-slate-300 hover:bg-slate-50 transition-colors">
                          View Documentation
                        </button>
                      </div>
                    </div>

                    {/* Mock Website Features */}
                    <div className="bg-slate-50 p-16 border-t border-slate-100">
                      <div className="grid grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl mb-6"></div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">Clean Feature {i}</h3>
                            <p className="text-slate-500 leading-relaxed">Minimalist design focuses only on what&apos;s absolutely necessary, providing a superior user experience without clutter.</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stage 4: Deploying / Deployed */}
          {(stage === "deploying" || stage === "deployed") && (
            <motion.div
              key="deploy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-6 w-full absolute inset-0 bg-white z-50"
            >
              <div className="max-w-md w-full text-center">
                {stage === "deploying" ? (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white mb-8 animate-pulse shadow-xl">
                      <Github size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Pushing to GitHub</h2>
                    <p className="text-slate-500 mb-8">Creating repository, committing code, and setting up actions...</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-slate-900"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner border-[8px] border-emerald-50">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Successfully Deployed!</h2>
                    <p className="text-slate-500 mb-8 text-lg">Your code has been pushed to GitHub and is ready to be hosted.</p>

                    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between mb-8">
                      <span className="text-slate-600 font-mono text-sm">github.com/your-username/generated-app</span>
                      <button className="text-blue-600 font-medium text-sm hover:underline">Copy URL</button>
                    </div>

                    <button
                      onClick={() => setStage("input")}
                      className="px-8 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                    >
                      Build Another App
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

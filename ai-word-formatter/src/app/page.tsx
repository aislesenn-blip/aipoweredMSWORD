"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Command, FileText } from "lucide-react";

export default function AIWorkspace() {
  const [content, setContent] = useState("");
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
      e.preventDefault();
      setShowCommandPalette(true);
    }

    if (e.key === "Escape") {
      setShowCommandPalette(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col items-center">

      {/* Minimal Navbar */}
      <header className="w-full max-w-4xl py-6 px-8 flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-blue-500" />
          <span className="text-sm font-medium text-gray-500 tracking-wide">Untitled Document</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
            <Command size={12} /> K
          </span>
        </div>
      </header>

      {/* Infinite Canvas */}
      <main className="w-full max-w-3xl flex-1 px-8 py-12 relative">

        {content === "" && (
          <div className="absolute top-12 left-8 text-gray-300 text-2xl font-light pointer-events-none tracking-tight">
            Start typing, or press <span className="font-medium px-2 py-0.5 bg-gray-100 rounded text-gray-400 text-xl">/</span> for magic...
          </div>
        )}

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="outline-none text-2xl leading-relaxed text-gray-800 font-light min-h-[50vh]"
          onInput={(e) => setContent(e.currentTarget.textContent || "")}
          onKeyDown={handleKeyDown}
        />

        {/* Command Palette Placeholder */}
        {showCommandPalette && (
          <div className="absolute mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 z-50">
            <div className="px-3 py-2 border-b border-gray-50 bg-gray-50/50">
              <input
                type="text"
                placeholder="Ask AI to write or format..."
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                autoFocus
              />
            </div>
            <div className="py-2">
              <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-sm text-gray-700 transition-colors">
                <FileText size={16} className="text-blue-500" />
                <span>Generate Outline</span>
              </div>
              <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-sm text-gray-700 transition-colors">
                <Sparkles size={16} className="text-purple-500" />
                <span>Brainstorm Ideas</span>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

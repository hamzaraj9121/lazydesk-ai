import React from "react";

export function HeroSection() {
  return (
    <div className="text-center space-y-3 pt-2 pb-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 mb-2">
        <span>🔒 100% Private</span>
        <span>•</span>
        <span>Zero Cloud Upload</span>
        <span>•</span>
        <span>Runs locally on Ollama</span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
        Untangle Desktop Clutter with{" "}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          Local AI
        </span>
      </h1>
      <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Drop messy notes, logs, receipts, or drafts. Gemma reads the contents,
        groups them into clean category folders, renames them intuitively, and
        bundles everything into an organized ZIP.
      </p>
    </div>
  );
}

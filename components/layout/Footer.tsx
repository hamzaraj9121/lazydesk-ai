import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/80 py-6 text-center text-xs text-neutral-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>LazyDesk AI • Powered by Gemma 4:e2b on Ollama</div>
        <div className="flex items-center gap-4">
          <span>Offline First</span>
          <span>•</span>
          <span>Zero Telemetry</span>
          <span>•</span>
          <span>Fast Local Inference</span>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { OrganizedFile } from "@/lib/types";

interface ResultCardProps {
  file: OrganizedFile;
  category: string;
  isCopied: boolean;
  onCopy: () => void;
  onDownload: () => void;
}

export function ResultCard({
  file,
  category,
  isCopied,
  onCopy,
  onDownload,
}: ResultCardProps) {
  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-3.5 space-y-2.5 flex flex-col justify-between hover:border-neutral-700 transition">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-neutral-400 truncate line-through opacity-70">
            {file.originalName}
          </span>
          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
            Renamed
          </span>
        </div>
        <div className="font-semibold text-sm text-neutral-100 flex items-center justify-between gap-2">
          <span className="truncate" title={file.suggestedName}>
            {file.suggestedName}
          </span>
          <button
            onClick={onCopy}
            className="text-neutral-500 hover:text-neutral-300 text-xs p-1"
            title="Copy suggested name"
          >
            {isCopied ? "✓" : "📋"}
          </button>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed bg-neutral-950/60 p-2 rounded border border-neutral-800/60">
          {file.summary}
        </p>
      </div>

      <div className="pt-2 flex items-center justify-between border-t border-neutral-800/50">
        <span className="text-[11px] text-neutral-500">
          Path: {category}/{file.suggestedName}
        </span>
        <button
          onClick={onDownload}
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium cursor-pointer"
        >
          <span>Download</span>
          <span>↓</span>
        </button>
      </div>
    </div>
  );
}

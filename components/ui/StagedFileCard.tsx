import React from "react";
import { StagedFile } from "@/lib/types";

interface StagedFileCardProps {
  file: StagedFile;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRemove: () => void;
}

export function StagedFileCard({
  file,
  isExpanded,
  onToggleExpand,
  onRemove,
}: StagedFileCardProps) {
  return (
    <div className="bg-neutral-950/80 border border-neutral-800/90 rounded-xl p-3.5 space-y-2 hover:border-neutral-700 transition">
      <div className="flex items-start justify-between gap-2">
        <div
          className="flex items-center gap-2 min-w-0 cursor-pointer"
          onClick={onToggleExpand}
        >
          <span className="text-lg">📄</span>
          <span
            className="text-xs font-medium text-neutral-200 truncate"
            title={file.name}
          >
            {file.name}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-neutral-500 hover:text-red-400 text-xs p-1"
          title="Remove file"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-500">
        <span>{file.size} bytes</span>
        <span>{file.content.length} chars</span>
      </div>

      {isExpanded && (
        <div className="mt-2 p-2 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300 max-h-32 overflow-y-auto whitespace-pre-wrap">
          {file.content}
        </div>
      )}
    </div>
  );
}

import React from "react";
import { StagedFile } from "@/lib/types";
import { MAX_FILES } from "@/lib/constants";
import { StagedFileCard } from "@/components/ui/StagedFileCard";

interface FileStagerProps {
  stagedFiles: StagedFile[];
  isLoading: boolean;
  loadingStep: string;
  expandedPreview: string | null;
  isDragOver: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (files: FileList | null) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onLoadSample: () => void;
  onClearAll: () => void;
  onRemoveFile: (name: string) => void;
  onTogglePreview: (name: string) => void;
  onOrganize: () => void;
}

export function FileStager({
  stagedFiles,
  isLoading,
  loadingStep,
  expandedPreview,
  isDragOver,
  fileInputRef,
  onFileUpload,
  onDragOver,
  onDragLeave,
  onDrop,
  onLoadSample,
  onClearAll,
  onRemoveFile,
  onTogglePreview,
  onOrganize,
}: FileStagerProps) {
  return (
    <section className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-neutral-800/50">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📁</span> Select or Drop Files
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Batch size: 1–5 text files (.txt, .md, .csv, .log, .json, code files)
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            id="load-sample-btn"
            onClick={onLoadSample}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition border border-neutral-700/60 hover:border-neutral-600 flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <span>✨</span> Load Sample Files
          </button>
          {stagedFiles.length > 0 && (
            <button
              id="clear-all-btn"
              onClick={onClearAll}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-800/50 hover:bg-red-950/40 text-neutral-400 hover:text-red-300 text-xs font-medium transition border border-transparent hover:border-red-900/40 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div
        id="drop-zone"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? "border-indigo-500 bg-indigo-500/10 scale-[1.005]"
            : "border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 hover:bg-neutral-950/60"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => onFileUpload(e.target.files)}
          multiple
          className="hidden"
          accept=".txt,.md,.markdown,.csv,.json,.log,.js,.ts,.tsx,.py,.html,.css,.yaml,.yml"
        />
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-indigo-400">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-indigo-400">
              Click to browse
            </span>{" "}
            <span className="text-neutral-400">or drag and drop files here</span>
          </div>
          <p className="text-xs text-neutral-500">
            Up to 5 files at a time (Max 12,000 characters per file)
          </p>
        </div>
      </div>

      {/* Staged Files List */}
      {stagedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 px-1">
            <span>Staged Files ({stagedFiles.length}/{MAX_FILES})</span>
            <span>Click file to preview snippet</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stagedFiles.map((file) => (
              <StagedFileCard
                key={file.name}
                file={file}
                isExpanded={expandedPreview === file.name}
                onToggleExpand={() => onTogglePreview(file.name)}
                onRemove={() => onRemoveFile(file.name)}
              />
            ))}
          </div>

          {/* Action Trigger */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400">
              Ready to process with local Gemma model.
            </div>
            <button
              id="organize-btn"
              onClick={onOrganize}
              disabled={isLoading || stagedFiles.length === 0}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Organizing...</span>
                </>
              ) : (
                <>
                  <span>✨ Organize with AI</span>
                </>
              )}
            </button>
          </div>

          {/* Loading Indicator Sub-bar */}
          {isLoading && (
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-300 text-xs flex items-center gap-3 animate-pulse">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></div>
              <span>{loadingStep || "Analyzing files with Gemma..."}</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

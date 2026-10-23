import React from "react";
import { OrganizedFile, ViewTab } from "@/lib/types";
import { ResultCard } from "@/components/ui/ResultCard";
import { CategoryBadge } from "@/components/ui/CategoryBadge";

interface ResultsSectionProps {
  results: OrganizedFile[];
  activeTab: ViewTab;
  copiedIndex: number | null;
  onTabChange: (tab: ViewTab) => void;
  onDownloadZip: () => void;
  onDownloadSingleFile: (file: OrganizedFile) => void;
  onCopy: (text: string, index: number) => void;
}

export function ResultsSection({
  results,
  activeTab,
  copiedIndex,
  onTabChange,
  onDownloadZip,
  onDownloadSingleFile,
  onCopy,
}: ResultsSectionProps) {
  // Group results by category
  const groupedResults = results.reduce<Record<string, OrganizedFile[]>>(
    (acc, item) => {
      const cat = item.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {}
  );

  return (
    <section
      id="results-section"
      className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6 animate-fadeIn"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">
              🎯 Organization Plan
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {results.length} files organized
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Categorized into {Object.keys(groupedResults).length} target
            directories.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* View toggle */}
          <div className="flex items-center p-1 bg-neutral-950 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => onTabChange("folder")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                activeTab === "folder"
                  ? "bg-neutral-800 text-white font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Folders
            </button>
            <button
              onClick={() => onTabChange("list")}
              className={`px-3 py-1 rounded-md transition cursor-pointer ${
                activeTab === "list"
                  ? "bg-neutral-800 text-white font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              List
            </button>
          </div>

          {/* Download Zip */}
          <button
            id="download-zip-btn"
            onClick={onDownloadZip}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-lg shadow-emerald-600/20 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download Organized ZIP</span>
          </button>
        </div>
      </div>

      {/* Folder View */}
      {activeTab === "folder" && (
        <div className="space-y-6">
          {Object.entries(groupedResults).map(([category, items]) => (
            <div
              key={category}
              className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📁</span>
                  <h3 className="font-bold text-white text-base">
                    {category}/
                  </h3>
                  <CategoryBadge
                    category={category}
                    className="ml-1"
                  />
                  <span className="text-xs text-neutral-500">
                    ({items.length} {items.length === 1 ? "file" : "files"})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {items.map((file, idx) => (
                  <ResultCard
                    key={`${file.originalName}-${idx}`}
                    file={file}
                    category={category}
                    isCopied={copiedIndex === idx}
                    onCopy={() => onCopy(file.suggestedName, idx)}
                    onDownload={() => onDownloadSingleFile(file)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {activeTab === "list" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-neutral-950 text-neutral-400 uppercase font-semibold border-b border-neutral-800">
              <tr>
                <th className="px-4 py-3">Original File</th>
                <th className="px-4 py-3">Category Folder</th>
                <th className="px-4 py-3">Suggested Clean Name</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {results.map((file, idx) => (
                <tr key={`${file.originalName}-${idx}`} className="hover:bg-neutral-800/30">
                  <td className="px-4 py-3 font-mono text-neutral-400">
                    {file.originalName}
                  </td>
                  <td className="px-4 py-3">
                    <CategoryBadge category={file.category} />
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">
                    {file.suggestedName}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-neutral-400">
                    {file.summary}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onDownloadSingleFile(file)}
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

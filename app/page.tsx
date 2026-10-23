"use client";

import React, { useState, useRef } from "react";
import { StagedFile, OrganizedFile, ViewTab } from "@/lib/types";
import {
  SAMPLE_FILES,
  MAX_FILES,
  MAX_FILE_SIZE_BYTES,
  MAX_CHAR_LENGTH,
} from "@/lib/constants";
import { downloadSingleFile, downloadAllAsZip } from "@/lib/utils";
import { organizeFiles } from "@/lib/api";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ErrorAlert } from "@/components/sections/ErrorAlert";
import { FileStager } from "@/components/sections/FileStager";
import { ResultsSection } from "@/components/sections/ResultsSection";

export default function Home() {
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
  const [results, setResults] = useState<OrganizedFile[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ViewTab>("folder");
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    const availableSlots = MAX_FILES - stagedFiles.length;
    if (availableSlots <= 0) {
      setError(`Maximum ${MAX_FILES} files can be organized in one batch.`);
      return;
    }

    const filesToRead = Array.from(files).slice(0, availableSlots);

    filesToRead.forEach((file) => {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`File "${file.name}" is too large. Max size is 500KB for text.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) || "";
        const truncated = text.slice(0, MAX_CHAR_LENGTH);

        setStagedFiles((prev) => {
          if (prev.some((f) => f.name === file.name)) {
            return prev;
          }
          if (prev.length >= MAX_FILES) return prev;
          return [
            ...prev,
            {
              name: file.name,
              size: file.size,
              content: truncated,
            },
          ];
        });
      };
      reader.readAsText(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const loadSampleFiles = () => {
    setError(null);
    setResults(null);
    setStagedFiles(SAMPLE_FILES);
  };

  const removeStagedFile = (name: string) => {
    setStagedFiles((prev) => prev.filter((f) => f.name !== name));
    if (results) {
      setResults(null);
    }
  };

  const clearAll = () => {
    setStagedFiles([]);
    setResults(null);
    setError(null);
  };

  const handleOrganize = async () => {
    if (stagedFiles.length === 0) {
      setError("Please add at least 1 file to organize.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setLoadingStep("Reading files and preparing payload...");

    try {
      setTimeout(() => {
        setLoadingStep("Querying local Gemma model via Ollama...");
      }, 1000);

      setTimeout(() => {
        setLoadingStep("Analyzing content, categorizing & generating summaries...");
      }, 4000);

      const organizedData = await organizeFiles(stagedFiles);
      setResults(organizedData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const handleDownloadSingle = (res: OrganizedFile) => {
    downloadSingleFile(res, stagedFiles);
  };

  const handleDownloadZip = async () => {
    if (!results) return;
    try {
      await downloadAllAsZip(results, stagedFiles);
    } catch (err) {
      console.error("ZIP creation error:", err);
      setError("Failed to create ZIP package.");
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Error Alert */}
        {error && <ErrorAlert error={error} onDismiss={() => setError(null)} />}

        {/* Upload & Staging Card */}
        <FileStager
          stagedFiles={stagedFiles}
          isLoading={isLoading}
          loadingStep={loadingStep}
          expandedPreview={expandedPreview}
          isDragOver={isDragOver}
          fileInputRef={fileInputRef}
          onFileUpload={handleFileUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onLoadSample={loadSampleFiles}
          onClearAll={clearAll}
          onRemoveFile={removeStagedFile}
          onTogglePreview={(name) =>
            setExpandedPreview((prev) => (prev === name ? null : name))
          }
          onOrganize={handleOrganize}
        />

        {/* Results Section */}
        {results && results.length > 0 && (
          <ResultsSection
            results={results}
            activeTab={activeTab}
            copiedIndex={copiedIndex}
            onTabChange={setActiveTab}
            onDownloadZip={handleDownloadZip}
            onDownloadSingleFile={handleDownloadSingle}
            onCopy={handleCopy}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import React from "react";

interface ErrorAlertProps {
  error: string;
  onDismiss: () => void;
}

export function ErrorAlert({ error, onDismiss }: ErrorAlertProps) {
  return (
    <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-sm flex items-start gap-3 shadow-lg shadow-red-950/20 animate-fadeIn">
      <svg
        className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <div className="flex-1">
        <span className="font-semibold text-red-200">Processing Error: </span>
        {error}
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-200 transition cursor-pointer"
        aria-label="Dismiss error"
      >
        ✕
      </button>
    </div>
  );
}

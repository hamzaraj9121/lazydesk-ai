import React from "react";
import { getCategoryColor } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  const colorClasses = getCategoryColor(category);

  return (
    <span
      className={`px-2 py-0.5 rounded-full border text-[11px] font-medium inline-flex items-center ${colorClasses} ${className}`}
    >
      {category}
    </span>
  );
}

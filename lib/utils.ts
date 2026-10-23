import JSZip from "jszip";
import { OrganizedFile, StagedFile } from "@/lib/types";

export function getCategoryColor(category: string): string {
  const lower = (category || "").toLowerCase();
  if (lower.includes("work"))
    return "bg-blue-500/10 text-blue-400 border-blue-500/30";
  if (lower.includes("personal"))
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  if (lower.includes("dev") || lower.includes("code"))
    return "bg-purple-500/10 text-purple-400 border-purple-500/30";
  if (lower.includes("study") || lower.includes("learn"))
    return "bg-amber-500/10 text-amber-400 border-amber-500/30";
  return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
}

export function downloadSingleFile(
  res: OrganizedFile,
  stagedFiles: StagedFile[]
): void {
  const original = stagedFiles.find((f) => f.name === res.originalName);
  const content = original ? original.content : "";
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = res.suggestedName || res.originalName;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadAllAsZip(
  results: OrganizedFile[],
  stagedFiles: StagedFile[]
): Promise<void> {
  if (!results || results.length === 0) return;

  const zip = new JSZip();

  results.forEach((res) => {
    const original = stagedFiles.find((f) => f.name === res.originalName);
    const content = original ? original.content : "";
    const safeCategory = (res.category || "Uncategorized").replace(
      /[/\\?%*:|"<>]/g,
      "_"
    );
    const safeName = (res.suggestedName || res.originalName).replace(
      /[/\\?%*:|"<>]/g,
      "_"
    );

    zip.folder(safeCategory)?.file(safeName, content);
  });

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = `LazyDesk_Organized_${new Date()
    .toISOString()
    .slice(0, 10)}.zip`;
  link.click();
  URL.revokeObjectURL(url);
}

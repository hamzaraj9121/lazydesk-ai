import { StagedFile, OrganizedFile } from "@/lib/types";

export async function organizeFiles(
  stagedFiles: StagedFile[]
): Promise<OrganizedFile[]> {
  const response = await fetch("/api/organize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      files: stagedFiles.map((f) => ({
        name: f.name,
        content: f.content,
      })),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to organize files.");
  }

  return data.files as OrganizedFile[];
}

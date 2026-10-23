import { OrganizedFile, FileItem, InputPayload, OrganizeResponse } from "@/lib/validation";

export interface StagedFile {
  name: string;
  size: number;
  content: string;
}

export type ViewTab = "folder" | "list";

export type { OrganizedFile, FileItem, InputPayload, OrganizeResponse };

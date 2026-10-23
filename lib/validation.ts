import { z } from "zod";

export const FileItemSchema = z.object({
  name: z.string().min(1).max(150),
  content: z.string().max(12000),
});

export const InputSchema = z.object({
  files: z.array(FileItemSchema).min(1).max(5),
});

export const OrganizedFileSchema = z.object({
  originalName: z.string(),
  category: z.string().min(1).max(60),
  suggestedName: z.string().min(1).max(150),
  summary: z.string().max(500),
});

export const OutputSchema = z.object({
  files: z.array(OrganizedFileSchema),
});

export type FileItem = z.infer<typeof FileItemSchema>;
export type InputPayload = z.infer<typeof InputSchema>;
export type OrganizedFile = z.infer<typeof OrganizedFileSchema>;
export type OrganizeResponse = z.infer<typeof OutputSchema>;

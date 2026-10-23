import { StagedFile } from "@/lib/types";

export const MAX_FILES = 5;
export const MAX_FILE_SIZE_BYTES = 500 * 1024; // 500KB
export const MAX_CHAR_LENGTH = 12000;

export const SAMPLE_FILES: StagedFile[] = [
  {
    name: "notes_sprint_q4.txt",
    size: 245,
    content:
      "Project Alpha Q4 Sprint Planning:\n- Finalize payment gateway integration by Nov 15.\n- Backend API refactoring for auth token expiration.\n- Review database indexing with DBA team.\n- Sarah will lead UI polish.",
  },
  {
    name: "weekly_groceries_todo.txt",
    size: 198,
    content:
      "Shopping & Tasks:\n- Whole bean coffee, oat milk, sourdough bread\n- Organic eggs and spinach\n- Pick up dry cleaning by 6 PM\n- Book dentist checkup for next Thursday",
  },
  {
    name: "db_migration_debug.log",
    size: 312,
    content:
      "[2026-10-23 09:14:02] INFO [DbWorker] Starting migration 004_create_users_table\n[2026-10-23 09:14:05] WARN [Pool] Connection pool nearing limit (85/100)\n[2026-10-23 09:14:07] SUCCESS [DbWorker] Migration 004 applied cleanly in 4.8s",
  },
];

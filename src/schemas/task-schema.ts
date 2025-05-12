import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "done"]),
});

export type TaskValues = z.infer<typeof TaskSchema>;

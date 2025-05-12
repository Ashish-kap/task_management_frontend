export type TaskStatus = "pending" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskValues = Omit<
  Task,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

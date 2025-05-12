import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TaskSchema } from "@/schemas/task-schema";
import type { TaskValues } from "@/schemas/task-schema";
import { useTasks } from "@/hooks/use-tasks";
import type { Task } from "@/types/task";
import { FormInput } from "../form/FormInput";
import { FormSelect } from "../form/FormSelect";

type TaskFormProps = {
  task?: Task;
  onSuccess?: () => void;
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Completed" },
];

export const TaskForm = ({ task, onSuccess }: TaskFormProps) => {
  const { createTask, updateTask, isPending } = useTasks();
  const form = useForm<TaskValues>({
    resolver: zodResolver(TaskSchema),
    defaultValues: task || {
      title: "",
      description: "",
      status: "pending",
    },
  });

  const onSubmit = async (values: TaskValues) => {
    try {
      if (task?.id) {
        await updateTask(task.id, values);
      } else {
        await createTask(values);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Task operation failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormInput<TaskValues>
          name="title"
          label="Title"
          placeholder="Task title"
        />
        <FormSelect<TaskValues>
          name="status"
          label="Status"
          options={STATUS_OPTIONS}
          placeholder="Select status"
        />
        <FormInput<TaskValues>
          name="description"
          label="Description"
          placeholder="Task description"
          type="textarea"
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Task"}
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;

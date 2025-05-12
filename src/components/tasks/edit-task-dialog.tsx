import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/tasks/task-form";
import type { Task } from "@/types/task";

type EditTaskDialogProps = {
  task: Task;
  onSuccess?: () => void;
  children: React.ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
};

export const EditTaskDialog = ({
  task,
  onSuccess,
  children,
  open,
  setOpen,
}: EditTaskDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          task={task}
          onSuccess={() => {
            setOpen(false);
            onSuccess?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

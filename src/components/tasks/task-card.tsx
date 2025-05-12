import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { format } from "date-fns";
import { Card } from "../ui/card";
import type { Task } from "@/types/task";
import DeleteConfirmation from "./delete-confirmation";
import TaskBadge from "./task-badge";
import { EditTaskDialog } from "./edit-task-dialog";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  onUpdate?: () => void;
  onDelete?: () => void;
};

const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const { deleteTask } = useTasks();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onDelete?.();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="space-y-2 text-start">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          {task.description && (
            <p className="text-muted-foreground">{task.description}</p>
          )}
          <div className="flex items-start gap-2 text-sm">
            <span className="text-muted-foreground">
              Created: {format(new Date(task.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TaskBadge status={task.status} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <EditTaskDialog
                open={open}
                setOpen={setOpen}
                task={task}
                onSuccess={onUpdate}
              >
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
              </EditTaskDialog>
              <DeleteConfirmation
                onConfirm={handleDelete}
                description="This action cannot be undone. This will permanently delete the task."
              >
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DeleteConfirmation>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;

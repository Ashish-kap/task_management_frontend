import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TaskForm from "@/components/tasks/task-form";

type CreateTaskDialogProps = {
  onCreate: () => void;
  children?: React.ReactNode; 
};

const CreateTaskDialog = ({ onCreate, children }: CreateTaskDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <TaskForm onSuccess={onCreate} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;

import { Badge } from "@/components/ui/badge";
import type { TaskStatus } from "@/types/task";
import { cn } from "@/lib/utils";

type TaskBadgeProps = {
  status: TaskStatus;
};

const TaskBadge = ({ status }: TaskBadgeProps) => {
  const statusMap = {
    pending: {
      label: "Pending",
      className:
        "bg-amber-100/80 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    "in-progress": {
      label: "In Progress",
      className:
        "bg-blue-100/80 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    done: {
      label: "Completed",
      className:
        "bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
  };

  const { label, className } = statusMap[status];

  return (
    <Badge
      variant="outline"
      className={cn("rounded-sm px-2 py-0.5 text-xs font-medium", className)}
    >
      {label}
    </Badge>
  );
};

export default TaskBadge;

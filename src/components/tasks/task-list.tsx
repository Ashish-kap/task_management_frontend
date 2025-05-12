import { Skeleton } from "@/components/ui/skeleton";
import { useTasks } from "@/hooks/use-tasks";
import EmptyState from "./empty-state";
import CreateTaskDialog from "./create-task-dialog";
import TaskCard from "./task-card";

export const TaskList = () => {
  const { tasks, loading, error, refreshTasks } = useTasks();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-[120px] w-full rounded-xl bg-slate-50/80 dark:bg-slate-800/40"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading tasks"
        description={error}
        action={{
          label: "Try again",
          onClick: refreshTasks,
        }}
      />
    );
  }

  return (
    <div className="relative rounded-xl bg-gradient-to-r from-indigo-50/40 to-purple-50/40 p-6 shadow-2xl shadow-indigo-100/30 dark:from-slate-800/40 dark:to-slate-800/20 dark:shadow-slate-900/80">
      <div className="absolute inset-0 rounded-xl border border-slate-100/30 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.02)_100%)] dark:border-slate-800/50"></div>
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <CreateTaskDialog onCreate={refreshTasks} />
        </div>

        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            description="Get started by creating a new task"
            className="border border-slate-100/50 bg-white/50 dark:border-slate-800/50 dark:bg-slate-800/30"
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={refreshTasks}
                onDelete={refreshTasks}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

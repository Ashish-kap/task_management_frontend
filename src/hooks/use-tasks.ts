import { useEffect, useRef, useState } from "react";
import { taskService } from "@/services/api";
import type { Task, TaskValues } from "@/types/task";
import axios from "axios";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isPending = isCreating || isUpdating || isDeleting;

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    fetchTasks();

    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setLoading(true);
      const data = await taskService.getTasks({
        signal: abortControllerRef.current.signal,
      });

      if (isMountedRef.current) {
        setTasks(data);
        setError(null);
      }
    } catch (err) {
      if (isMountedRef.current && !axios.isCancel(err)) {
        setError("Failed to fetch tasks");
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const createTask = async (values: TaskValues) => {
    try {
      setIsCreating(true);
      await taskService.createTask(values);
      await fetchTasks();
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setIsCreating(false);
    }
  };

  const updateTask = async (id: string, values: TaskValues) => {
    try {
      setIsUpdating(true);
      await taskService.updateTask(id, values);
      await fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setIsDeleting(true);
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
    isPending,
  };
};

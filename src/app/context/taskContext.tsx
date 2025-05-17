"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { getTasks as apiGetTasks, addTask as apiAddTask, doneTask as apiDoneTask, reAddTask as apiReAddTask } from "@/services/taskAPIService";

import type { Task, TaskStatus } from "@/types/task";

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  fetchTasks: () => Promise<void>;
  addTask: (task: string) => Promise<void>;
  doneTask: (id: number) => Promise<void>;
  reAddTask: (task: Task) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await apiGetTasks();
      setTasks(data.tasks);
      if (typeof window !== "undefined") {
        localStorage.setItem("tasks", JSON.stringify(data.tasks));
      }
    } catch {
      // Optionally handle error
    }
  };

  const addTask = async (task: string) => {
    if (task.trim() === "") return;
    const newTaskData: Task = {
      id: Date.now(),
      task,
      status: TaskStatus.Active,
      date: new Date(),
    };
    setTasks((prev) => [newTaskData, ...prev]);
    try {
      await apiAddTask(task);
      await fetchTasks();
    } catch {
      setTasks((prev) => prev.filter((t) => t.id !== newTaskData.id));
    }
  };

  const doneTask = async (id: number) => {
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, status: TaskStatus.Done } : task));
    try {
      await apiDoneTask(id);
      await fetchTasks();
    } catch {
      // Optionally handle error
    }
  };

  const reAddTask = async (task: Task) => {
    const updatedTask = { ...task, date: new Date(), status: TaskStatus.Active };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    try {
      await apiReAddTask(task);
      await fetchTasks();
    } catch {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cachedTasks = localStorage.getItem("tasks");
    if (cachedTasks) {
      setTasks(JSON.parse(cachedTasks));
    }
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, fetchTasks, addTask, doneTask, reAddTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

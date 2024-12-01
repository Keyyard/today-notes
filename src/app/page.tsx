"use client";

import { useEffect, useState, useRef } from "react";
import { addTask, getTasks, doneTask, reAddTask } from "@/services/taskService";
import ThemeSwitcher from "@/app/components/themeSwticher";
import { Task, TaskStatus } from "@/app/components/task";
import { Toaster, toast } from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react";

export default function App() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [time, setTime] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 60000);

    setTime(
      new Date().toLocaleTimeString([], {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );

    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (error) {
      console.log("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    try {
      const newTaskData = {
        id: Date.now(),
        task: newTask,
        status: TaskStatus.Active,
        date: new Date(),
      };
      setTasks([...tasks, newTaskData]);
      await addTask(newTask);
      setNewTask("");
    } catch (error) {
      toast.error("Error adding task");
      console.log("Error adding task");
    }
  };

  const handleDoneTask = async (id: number) => {
    try {
      await doneTask(id);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: TaskStatus.Done } : task
        )
      );
      fetchTasks();
    } catch (error) {
      console.log("Error done task");
    }
  };

  const handleReAddTask = async (task: Task) => {
    try {
      await reAddTask(task);
      setTasks(
        tasks.map((t) =>
          t.id === task.id
            ? { ...t, date: new Date(), status: TaskStatus.Active }
            : t
        )
      );
      fetchTasks();
    } catch (error) {
      console.error("Error re-adding task", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleInputBlur = () => {
    handleAddTask();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const toggleInput = () => {
    setShowInput(!showInput);
    if (!showInput && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeSwitcher />
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
      <div className="justify-center">
        <h1 className="header">Today</h1>
        <h2 className="timestamp">{time}</h2>
      </div>
      {!session ? (
        <div>
          <button onClick={() => signIn("google")} className="sign-in">
            Sign in with Google
          </button>
            <div className="flex justify-center items-center">
              Please sign in to view tasks
            </div>
        </div>
      ) : (
        <div>
          <button onClick={() => signOut()} className="sign-out">
            Sign out
          </button>
          <div className="task-list">
            {showInput && (
              <input
                ref={inputRef}
                type="text"
                value={newTask}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyPress={handleKeyPress}
                placeholder="Type a new task.."
                className="task-input"
              />
            )}
            {tasks
              .filter((task) => task.status === TaskStatus.Active)
              .map((task, index) => (
                <div
                  key={index}
                  className="active-task task"
                  onClick={() => handleDoneTask(task.id)}
                >
                  {task.task}
                </div>
              ))}
            {tasks
              .filter((task) => task.status === TaskStatus.Expired)
              .map((task, index) => (
                <div
                  key={index}
                  className="expired-task task"
                  onClick={() => handleDoneTask(task.id)}
                >
                  {task.task}
                </div>
              ))}
            {tasks
              .filter((task) => task.status === TaskStatus.Done)
              .map((task, index) => (
                <div
                  key={index}
                  className="done-task task"
                  onClick={() => handleReAddTask(task)}
                >
                  {task.task}
                </div>
              ))}
            <button className="add-task-button" onClick={toggleInput}>
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

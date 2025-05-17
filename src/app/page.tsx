"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { lazy, Suspense, useRef, useState, useEffect } from "react";

import Landing from "@/app/components/Landing";
import { useTask } from "@/app/context/taskContext";

const FooterText = lazy(() => import("@/app/components/FooterText"));
const ThemeSwitcher = lazy(() => import("@/app/components/themeSwitcher"));
const Toaster = lazy(() =>
  import("react-hot-toast").then((mod) => ({ default: mod.Toaster }))
);

export default function App() {
  const { data: session } = useSession();
  const { tasks, addTask, doneTask, reAddTask } = useTask();
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

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    await addTask(newTask);
    setNewTask("");
  };

  const handleDoneTask = async (id: number) => {
    await doneTask(id);
  };

  const handleReAddTask = async (task: Task) => {
    await reAddTask(task);
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

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const toggleInput = () => {
    setShowInput(!showInput);
    if (!showInput && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <>
      <main>
        <div className="min-h-screen bg-background text-foreground">
          <Suspense fallback={<div>Loading...</div>}>
            <ThemeSwitcher />
            <Toaster position="top-right" reverseOrder={true} />
          </Suspense>
          <div className="justify-center">
            <h1 className="header">Today</h1>
            <h2 className="timestamp">{time}</h2>
          </div>
          {!session ? (
            <Landing />
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
                    onFocus={handleInputFocus}
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
          <FooterText />
        </div>
      </main>
    </>
  );
}
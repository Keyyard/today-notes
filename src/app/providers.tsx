'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { TaskProvider } from "@/app/context/taskContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TaskProvider>
        {children}
      </TaskProvider>
    </SessionProvider>
  );
}
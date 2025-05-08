//** 
// This is a API Service for CLIENT SIDE - FRONT END API calls.
// This will trigger the signals to the server and get the data back.
// **
import { Task } from "@/app/components/task";
import { getSession } from "next-auth/react";

export async function getTasks() {
  const session = await getSession();
  if (!session || !session.accessToken) throw new Error('Not authenticated');

  const res = await fetch('/api/tasks', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function addTask(task: string) {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');

  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({ task }),
  });

  if (!res.ok) throw new Error('Failed to add task');
  return res.json();
}

export async function doneTask(id: number) {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');

  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Failed to mark task as done');
  return res.json();
}

export async function reAddTask(task: Task) {
  const session = await getSession();
  if (!session) throw new Error('Not authenticated');

  const res = await fetch(`/api/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error('Failed to re-add task');
  return res.json();
}

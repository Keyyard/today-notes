import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TaskStatus } from '@/app/components/task';

interface Task {
  id: number;
  task: string;
  status: TaskStatus;
  date: Date;
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  message: string;
  task?: Task;
}

async function handleTaskExpirationAndDeletion(userId: string) {
  const now = new Date();
  const tasks = await prisma.task.findMany({
    where: { userId },
  });

  for (const task of tasks) {
    const taskDate = new Date(task.date);
    const diff = now.getTime() - taskDate.getTime();
    const diffHours = diff / (1000 * 60 * 60);

    if (task.status === TaskStatus.Active && diffHours >= 24) {
      await prisma.task.update({
        where: { id: task.id },
        data: { status: TaskStatus.Expired },
      });
    }

    if (task.status === TaskStatus.Done && diffHours >= 24) {
      await prisma.task.delete({
        where: { id: task.id },
      });
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ErrorResponse | SuccessResponse | { tasks: Task[] }>) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log('token:', token);
  if (!token || !token.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        email: token.email,
      },
    });
    user = newUser;
  }

  switch (req.method) {
    case 'GET':
      try {
        await handleTaskExpirationAndDeletion(user.id);
        const tasks = await prisma.task.findMany({
          where: { userId: user.id },
          orderBy: { date: 'desc' },
        });
        return res.status(200).json({ tasks });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
      }

    case 'POST':
      try {
        const { task } = req.body;
        const newTask = await prisma.task.create({
          data: {
            task,
            status: TaskStatus.Active,
            date: new Date(),
            userId: user.id,
          },
        });
        return res.status(201).json({ message: 'Task added successfully', task: newTask });
      } catch (error) {
        console.error('Error adding task:', error);
        return res.status(500).json({ error: 'Failed to add task' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

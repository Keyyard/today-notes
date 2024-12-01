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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  // get token from Authorization header
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log('token:', token);
  if (!token || !token.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized | User not found' });
  }

  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const updatedTask = await prisma.task.update({
          where: {
            id: Number(id),
            userId: user.id,
          },
          data: { status: TaskStatus.Done },
        });
        return res.status(200).json({ message: 'Task marked as done', task: updatedTask });
      } catch (error) {
        console.error('Error marking task as done:', error);
        return res.status(500).json({ error: 'Failed to mark task as done' });
      }

    case 'PATCH':
      try {
        const updatedTask = await prisma.task.update({
          where: {
            id: Number(id),
            userId: user.id,
          },
          data: { status: TaskStatus.Active, date: new Date() },
        });
        return res.status(200).json({ message: 'Task re-added successfully', task: updatedTask });
      } catch (error) {
        console.error('Error re-adding task:', error);
        return res.status(500).json({ error: 'Failed to re-add task' });
      }

    default:
      res.setHeader('Allow', ['PUT', 'PATCH']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
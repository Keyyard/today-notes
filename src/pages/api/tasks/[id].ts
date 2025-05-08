import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TaskStatus } from '@/app/components/task';
import type Task from '@/types/task';
import TaskRepository from '@/app/repositories/taskRepository';
import type { ErrorResponse, SuccessResponse } from '@/types/responses';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {

  const TaskRepo = new TaskRepository();
  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const updatedTask = await TaskRepo.putTask(req, Number(id));
        return res.status(200).json({ message: 'Task marked as done', task: updatedTask });
      } catch (error) {
        console.error('Error marking task as done:', error);
        return res.status(500).json({ error: 'Failed to mark task as done' });
      }

    case 'PATCH':
      try {
        const updatedTask = await TaskRepo.patchTask(req, Number(id));
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
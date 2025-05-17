//**
// This is a Route handler for the endpoint /api/tasks
// This will handle the requests from Services
//  and send the data to the Repository to interact with the database
//  */
import TaskRepository from '@/app/repositories/taskDBRepository';

import type { ErrorResponse, SuccessResponse } from '@/types/responses';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ErrorResponse | SuccessResponse | { tasks: Task[] }>) {
  const taskRepo = new TaskRepository();
  switch (req.method) {
    case 'GET':
      try {
        await taskRepo.handleTaskExpirationAndDeletion(req);
        const tasks = await taskRepo.getTasks(req);
        return res.status(200).json({ tasks });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
      }

    case 'POST':
      try {
        const { task } = req.body;
        const newTask = await taskRepo.postTask(req, task);
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

//** 
// This is a Database Repository layer
// This interacts with the database directly for the server-side code - BACKEND
// RECEIVE SIGNALS FROM THE FRONTEND AND SENDS BACK DATA
// **

import { getToken } from 'next-auth/jwt';

import prisma from '@/lib/prisma';

import type { NextApiRequest } from 'next';

export default class TaskRepository {
    private getUser = async (req: NextApiRequest) => {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token || !token.email) {
            return null;
        }
        const user = await prisma.user.findUnique({
            where: { email: token.email },
        });
        return user;
    }

    handleTaskExpirationAndDeletion = async (req: NextApiRequest) => {
        const user = await this.getUser(req);
        const now = new Date();
        const tasks = await prisma.task.findMany({
            where: { userId: user.id },
            orderBy: { date: 'desc' },
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
    getTasks = async (req: NextApiRequest) => {
        const user = await this.getUser(req);
        await this.handleTaskExpirationAndDeletion(req);
        const tasks = await prisma.task.findMany({
            where: { userId: user.id },
            orderBy: { date: 'desc' },
        });
        return tasks;
    }
    postTask = async (req: NextApiRequest, task: string) => {
        const user = await this.getUser(req);
        const newTask = await prisma.task.create({
            data: {
                task,
                status: TaskStatus.Active,
                date: new Date(),
                userId: user.id,
            },
        });
        return newTask;
    }
    putTask = async (req: NextApiRequest, id: number) => {
        const user = await this.getUser(req);
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(id),
                userId: user.id,
            },
            data: { status: TaskStatus.Done, date: new Date() },
        });
        return updatedTask;
    }
    patchTask = async (req: NextApiRequest, id: number) => {
        const user = await this.getUser(req);
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(id),
                userId: user.id,
            },
            data: { status: TaskStatus.Active, date: new Date() },
        });
        return updatedTask;
    }
}
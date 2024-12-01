interface Task {
    id: number;
    task: string;
    date: Date;
    status: string | TaskStatus;
    }

enum TaskStatus {
    Active = "active",
    Done = "done",
    Expired = "expired",
}

export type { Task };
export { TaskStatus };
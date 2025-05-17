declare global {
  enum TaskStatus {
    Active = "active",
    Done = "done",
    Expired = "expired",
  }
  interface Task {
    id: number;
    task: string;
    status: TaskStatus;
    date: Date;
  }
}

export {};
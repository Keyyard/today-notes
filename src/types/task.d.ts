export default interface Task {
  id: number;
  task: string;
  status: TaskStatus;
  date: Date;
}
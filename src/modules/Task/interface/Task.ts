export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",

  ALL = "ALL",
}

export interface TaskProps {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}

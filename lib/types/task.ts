export enum TaskStatus {
  TODO = "TODO",
  COMPLETED = "COMPLETED"
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export interface TaskContextType {
  tasks: Task[]
  addTask: (title: string, description: string) => void
  editTask: (id: string, title: string, description: string) => void
  deleteTask: (id: string) => void
  toggleTaskStatus: (id: string) => void
} 
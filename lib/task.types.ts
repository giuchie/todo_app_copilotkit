export interface Task {
    id: string
    title: string
    description: string
    completed: boolean
  }
  
  export interface TaskContextType {
    tasks: Task[]
    addTask: (title: string, description: string) => void
    editTask: (id: string, title: string, description: string) => void
    deleteTask: (id: string) => void
    toggleTaskCompletion: (id: string) => void
  }
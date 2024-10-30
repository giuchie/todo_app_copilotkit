"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Task, TaskContextType, TaskStatus } from "@/lib/types/task"
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"; 

const MOCK_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Fare la spesa",
    description: "Comprare frutta, verdura, pane e latte al supermercato",
    status: TaskStatus.TODO,
  },
  {
    id: "task-2",
    title: "Chiamare il dentista",
    description: "Prenotare un appuntamento per il controllo semestrale",
    status: TaskStatus.COMPLETED,
  },
  {
    id: "task-3",
    title: "Pagare le bollette",
    description: "Pagare le bollette di luce e gas entro fine mese",
    status: TaskStatus.TODO,
  },
  {
    id: "task-4",
    title: "Pulire casa",
    description: "Passare l'aspirapolvere e lavare i pavimenti",
    status: TaskStatus.COMPLETED,
  },
]

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)

  useCopilotReadable({
    description: "The state of the todo list",
    value: JSON.stringify(tasks),
  })

  useCopilotAction({
    name: "addTask",
    description: "Adds a new task to the todo list",
    parameters: [
        {
            name: "title",
            type: "string",
            description: "The title of the task",
            required: true,
        },
        {
            name: "description",
            type: "string",
            description: "The description of the task. If not provided, the task will be created with an empty description.",
            required: true,
        }
    ],
    handler: ({title, description}) => {
        addTask(title, description)
    }
  })

  const addTask = (title: string, description: string) => {
    if (!title.trim()) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: TaskStatus.TODO,
    }

    setTasks((prev) => [...prev, newTask])
  }

  const editTask = (id: string, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === TaskStatus.TODO
                  ? TaskStatus.COMPLETED
                  : TaskStatus.TODO,
            }
          : task
      )
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}
"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Task, TaskContextType, TaskStatus } from "@/lib/types/task"

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

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
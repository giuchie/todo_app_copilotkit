"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useTasks } from "@/lib/hooks/use-tasks"
import { TaskStatus } from "@/lib/types/task"
import { TaskItem } from "@/components/TaskItem"

interface TaskFormState {
  title: string
  description: string
}

export function TodoList() {
  const { tasks, addTask } = useTasks()
  const [editingId, setEditingId] = useState<string>("")
  const [newTask, setNewTask] = useState<TaskFormState>({
    title: "",
    description: "",
  })

  const handleAddTask = () => {
    addTask(newTask.title, newTask.description)
    setNewTask({ title: "", description: "" })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <Input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            placeholder="Task description (optional)"
            value={newTask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <Button onClick={handleAddTask} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={task.status === TaskStatus.COMPLETED ? "bg-secondary/50" : ""}
          >
            <CardContent className="p-6">
              <TaskItem
                task={task}
                onEdit={setEditingId}
                isEditing={editingId === task.id}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Check, Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useTasks } from "@/lib/hooks/use-tasks"
import { Task, TaskStatus } from "@/lib/types/task"

interface TaskFormState {
  title: string
  description: string
}

interface TaskItemProps {
  task: Task
  onEdit: (id: string) => void
  isEditing: boolean
}

function TaskItem({ task, onEdit, isEditing }: TaskItemProps) {
  const { editTask, deleteTask, toggleTaskStatus } = useTasks()
  const [editedTask, setEditedTask] = useState(task)

  if (isEditing) {
    return (
      <div className="space-y-4">
        <Input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Textarea
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <Button
          onClick={() => {
            editTask(task.id, editedTask.title, editedTask.description)
            onEdit("")
          }}
          variant="default"
        >
          Save
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-start justify-between">
      <div>
        <h3
          className={`text-lg font-semibold ${
            task.status === TaskStatus.COMPLETED
              ? "line-through text-muted-foreground"
              : ""
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-muted-foreground mt-1">{task.description}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleTaskStatus(task.id)}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit(task.id)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <div className="flex justify-end gap-4">
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
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
"use client"

import { useState } from "react"
import { Check, Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTasks } from "@/lib/hooks/use-tasks"
import { Task, TaskStatus } from "@/lib/types/task"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface TaskItemProps {
  task: Task
  onEdit: (id: string) => void
  isEditing: boolean
}

export function TaskItem({ task, onEdit, isEditing }: TaskItemProps) {
  const { editTask, deleteTask, toggleTaskStatus } = useTasks()
  const [editedTask, setEditedTask] = useState(task)

  if (isEditing) {
    return (
      <div className="space-y-4 bg-muted p-4 rounded-lg">
        <Input
          type="text"
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Task title"
          className="text-lg font-medium"
        />
        <Textarea
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Task description (optional)"
          className="min-h-[100px]"
        />
        <div className="flex justify-end space-x-2">
          <Button
            onClick={() => onEdit("")}
            variant="outline"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={() => {
              editTask(task.id, editedTask.title, editedTask.description)
              onEdit("")
            }}
            variant="default"
            size="sm"
          >
            <Check className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start justify-between space-x-4">
      <div className="flex items-start space-x-3 flex-grow">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.status === TaskStatus.COMPLETED}
          onCheckedChange={() => toggleTaskStatus(task.id)}
          className="mt-1"
        />
        <div>
          <Label
            htmlFor={`task-${task.id}`}
            className={cn(
              "text-lg font-medium cursor-pointer",
              task.status === TaskStatus.COMPLETED && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </Label>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task.id)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit task</span>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. This will permanently delete the task
              &apos;{task.title}&apos;.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>Cancel</Button>
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
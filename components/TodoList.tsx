"use client"

import { useState } from "react"
import { Plus, ListTodo, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/lib/hooks/use-tasks"
import { TaskStatus } from "@/lib/types/task"
import { TaskItem } from "@/components/TaskItem"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    if (newTask.title.trim()) {
      addTask(newTask.title, newTask.description)
      setNewTask({ title: "", description: "" })
    }
  }

  const activeTasks = tasks.filter(task => task.status === TaskStatus.TODO)
  const completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED)

  return (
    <div className="space-y-8">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
            <Plus className="h-6 w-6" />
            Add New Task
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={newTask.title}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
            className="text-lg"
          />
          <Textarea
            placeholder="Add some details (optional)"
            value={newTask.description}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
            className="min-h-[100px]"
          />
          <Button onClick={handleAddTask} className="w-full text-lg" size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add Task
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="text-lg">
            <ListTodo className="mr-2 h-5 w-5" />
            Active Tasks ({activeTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-lg">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Completed Tasks ({completedTasks.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4 space-y-4">
          {activeTasks.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <Circle className="mx-auto h-12 w-12 mb-2" />
                No active tasks. Time to add some!
              </CardContent>
            </Card>
          ) : (
            activeTasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <TaskItem
                    task={task}
                    onEdit={setEditingId}
                    isEditing={editingId === task.id}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-4 space-y-4">
          {completedTasks.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <CheckCircle2 className="mx-auto h-12 w-12 mb-2" />
                No completed tasks yet. Keep going!
              </CardContent>
            </Card>
          ) : (
            completedTasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-secondary bg-secondary/10">
                <CardContent className="p-6">
                  <TaskItem
                    task={task}
                    onEdit={setEditingId}
                    isEditing={editingId === task.id}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
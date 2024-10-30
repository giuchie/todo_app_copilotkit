import { TodoList } from "@/components/TodoList"
import { TaskProvider } from "@/lib/hooks/use-tasks"

export default function Home() {
  return (
    
        <TaskProvider>
          <TodoList />
        </TaskProvider>
     
  )
}

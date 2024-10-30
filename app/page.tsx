import { TodoList } from "@/components/TodoList"
import { TaskProvider } from "@/lib/hooks/use-tasks"
import { CopilotKit } from "@copilotkit/react-core"
import { CopilotPopup } from "@copilotkit/react-ui"; 
import "@copilotkit/react-ui/styles.css"; 

export default function Home() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
        <TaskProvider>
          <TodoList />
        </TaskProvider>
        <CopilotPopup />
      </CopilotKit>
  )
}

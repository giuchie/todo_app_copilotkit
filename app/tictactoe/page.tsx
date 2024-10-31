import React from 'react'
import Board from '@/components/tictactoe/Board'
import { CopilotKit } from '@copilotkit/react-core'
import { CopilotPopup } from '@copilotkit/react-ui'
import '@copilotkit/react-ui/styles.css'

const Page = () => {
  return (
    <>
    <CopilotKit runtimeUrl="/api/copilotkit">
        <Board />
        <CopilotPopup />
    </CopilotKit>
    </>
  )
}

export default Page
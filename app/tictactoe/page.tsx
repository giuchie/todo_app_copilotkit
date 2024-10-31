'use client'
import React from 'react'
import { CopilotKit } from '@copilotkit/react-core'
import { CopilotPopup } from '@copilotkit/react-ui'
import '@copilotkit/react-ui/styles.css'
import Game from '@/components/tictactoe/Game'

const Page = () => {
  return (
    <>
    <CopilotKit runtimeUrl="/api/copilotkit">
        <Game />
        <CopilotPopup />
    </CopilotKit>
    </>
  )
}

export default Page
'use client'

import React from 'react'
import Square from './Square'
import { useState } from 'react'
import { player, PlayerType } from '@/lib/tictactoe.types'
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core'



function calculateWinner(squares: player[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

const Board = () => {
    const [squares, setSquares] = useState<player[]>(Array(9).fill(null))
    const [isNext, setIsNext] = useState<boolean>(true)
    //const [winner, setWinner] = useState<player | null>(null)
    const winner = calculateWinner(squares)

    useCopilotReadable({
        description: "The state of the tic tac toe board",
        value: JSON.stringify(squares),
    })

    const handleClick = (index: number) => {
        //const winner = calculateWinner(squares)
        //setWinner(winner)
        if(squares[index] || winner) return

        const nextSquares = [...squares]
        nextSquares[index] = isNext ? PlayerType.User : PlayerType.Ai
        setSquares(nextSquares)
        setIsNext(!isNext)
    }

    useCopilotAction({
        name: "Your",
        description: "Make YOUR move on the tic tac toe board. Think carefully before you make your move.",
        parameters: [
            {
                name: "index",
                type: "number",
                description: "The index of the square to make your move on",
                required: true,
            }
        ],
        handler: ({index}) => {
            handleClick(index)
        }
    })

  return (
    <>
    <div className='text-center text-2xl font-bold mb-4'>{winner ? `Winner : ${winner}` : `Current Player: ${isNext ? PlayerType.User : PlayerType.Ai}`}</div>
    <div className='flex flex-col items-center '>
        <div className='grid grid-cols-3 gap-0 '>
               
            {squares.map((square, index) => (
                <Square index={index} key={index} value={square} onSquareClick={handleClick}/>
            ))}
        </div>
    </div>
            </>
  )
}

export default Board
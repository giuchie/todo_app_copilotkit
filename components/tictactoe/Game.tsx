'use client'

import React, { useState } from 'react'
import Board from './Board'
import { player } from '@/lib/tictactoe.types'

const Game = () => {
    //const [isNext, setIsNext] = useState<boolean>(true)
    const [history, setHistory] = useState<[player[]]>([Array(9).fill(null)]) 
    const [currentMove, setCurrentMove] = useState(0);
    const isNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares: player[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        //setIsNext(!isNext)
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove)
        setHistory(history.slice(0, nextMove + 1))
        //setIsNext(nextMove % 2 === 0)
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      });

  return (
    <div className='flex gap-4 justify-center items-center'>
        <div className='flex flex-col min-w-[300px]'>
            <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div>
            <p>{moves}</p>
        </div>
    </div>
  )
}

export default Game
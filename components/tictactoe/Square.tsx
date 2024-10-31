'use client'
import React from 'react'
import {  PlayerType } from '@/lib/tictactoe.types'

type SquareProps = {
    index: number
    value: string | null
    onSquareClick: (index: number) => void
}

const Square = ({ index, value, onSquareClick }: SquareProps) => {    

    const handleClick = () => {
        onSquareClick(index)
    }

  return (
    <button onClick={handleClick} className='relative border border-black w-16 h-16 flex items-center justify-center text-4xl font-bold'>
        <span className='absolute top-0 left-0 text-xs font-light'>
            {index}
            </span>
        {value === PlayerType.User && 'X'}
        {value === PlayerType.Ai && 'O'}
    </button>
  )
}

export default Square
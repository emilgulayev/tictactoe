import React from 'react'
import './GameRow.sass'

export default function GameRow({children}){
    return (
        <div className="game-row">
            {children}
        </div>
    )
}

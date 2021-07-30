import React from 'react'
import './GameTable.sass'

export default function GameTable({children}){
    return (
        <div className="game-table">
            {children}
        </div>
    )
}

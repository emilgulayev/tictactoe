import React from 'react'
import './GameRow.sass'

export default function GameRow({children}){
    return (
        <div className="Game-row">
            {children}
        </div>
    )
}

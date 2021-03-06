import React from 'react'
import './GameSquare.sass'

export default function GameSquare({row,col,value,isHighlighted,onSquareHover,onPlayerMove}){
    return <div onMouseEnter={()=>onSquareHover(row,col)} onMouseLeave={()=>onSquareHover(-1,-1)}
                onClick={()=> onPlayerMove(row,col)}
                className={isHighlighted? 'Game-square highlighted': 'Game-square'}>{value}</div>
}

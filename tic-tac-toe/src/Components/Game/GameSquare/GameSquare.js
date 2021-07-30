import React,{useState,useEffect} from 'react'
import './GameSquare.sass'

export default function GameSquare({row,col,value,isHighlighted,onSquareHover}){
    return <div onMouseEnter={()=>onSquareHover(row,col)} onMouseLeave={()=>onSquareHover(-1,-1)}
                className={isHighlighted? 'game-square highlighted': 'game-square'}>{value}</div>
}

import React,{useState,useEffect} from 'react'

export default function GameTable({children}){
    return (
        <div className="game-table">
            {children}
        </div>
    )
}

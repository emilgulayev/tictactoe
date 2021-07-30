import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import { css } from "@emotion/react"
import './Game.sass'

import GameTable from './GameTable/GameTable'
import GameRow from './GameRow/GameRow'
import GameSquare from './GameSquare/GameSquare'

function Game() {

    const [validToken,setValidToken]=useState('')
    const [board,setBoard]=useState([[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']])
    const [rowHovered,setRowHovered]=useState(-1)
    const [colHovered,setColHovered]=useState(-1)

    useEffect(()=>{
        if(!window.sessionStorage.getItem("token")) setValidToken(false)
        else setValidToken(true)
    },[])


    const onPlayerMove=(row,col)=>{
        setBoard(prevState=>{
            let newBoard=[...prevState];
            newBoard[row][col]='X'
            setBoard(newBoard)
        })
    }

    const onSquareHover=(row,col)=>{
        setRowHovered(row)
        setColHovered(col)
    }

    if(validToken==='') return <div>Redirecting...</div>
    if(!validToken) return <Redirect to="/signup"></Redirect>
    return (
        <div className="Game">
            <h1>Game</h1>
            <GameTable>
                {board?.map((rowElement,rowIndex)=>{
                    return (
                        <GameRow key={rowIndex}>
                            {rowElement?.map((colElement,colIndex)=>{
                                return(
                                    <GameSquare key={rowIndex + ',' + colIndex} value={colElement} row={rowIndex} col={colIndex}
                                                isHighlighted={rowIndex===rowHovered || colIndex===colHovered} onSquareHover={onSquareHover.bind(this)}
                                                    onPlayerMove={onPlayerMove.bind(this)}/>
                                )
                            })}
                        </GameRow>
                    )
                })}
            </GameTable>
        </div>
    )
}

export default Game

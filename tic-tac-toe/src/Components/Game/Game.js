import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import './Game.sass'

import GameTable from './GameTable/GameTable'
import GameRow from './GameRow/GameRow'
import GameSquare from './GameSquare/GameSquare'

function Game() {
    const [validToken,setValidToken]=useState('')
    const [board,setBoard]=useState([['','',''],['','',''],['','','']])
    const [rowHovered,setRowHovered]=useState(-1)
    const [colHovered,setColHovered]=useState(-1)

    useEffect(()=>{
        if(!window.sessionStorage.getItem("token")){
            setValidToken(false)
        }
        else setValidToken(true)
    },[])


    const onPlayerMove=(row,col)=>{
        setBoard(prevState=>{
            let newBoard=[...prevState];
            newBoard[row][col]='X'
            setBoard(newBoard)
        })

        axios({
            method: 'post',
            url: 'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/engine',
            data: {
                board: board,
            },
            headers:{
                Authorization:`Bearer ${window.sessionStorage.getItem("token")} +`
            }
        }).then(res=>{
            console.log("AI res:",res)
            if(res?.data?.success){
                setBoard(res.data.board)
            }
        }).catch(error=>{
            setValidToken(false)
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
            <button type="button" className="btn btn-success">Suggest a Move</button>
            <GameTable>
                {board?.map((rowElement,rowIndex)=>{
                    return (
                        <GameRow key={rowIndex}>
                            {rowElement?.map((colElement,colIndex)=>{
                                return(
                                    <GameSquare key={rowIndex + ',' + colIndex} value={colElement} row={rowIndex} col={colIndex}
                                                isHighlighted={rowIndex===rowHovered || colIndex===colHovered} onSquareHover={onSquareHover}
                                                    onPlayerMove={onPlayerMove}/>
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

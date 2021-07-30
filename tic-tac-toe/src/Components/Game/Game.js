import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import GameTable from './GameTable/GameTable'
import GameRow from './GameRow/GameRow'
import GameSquare from './GameSquare/GameSquare'
import Spinner from '../Spinner/Spinner'

import './Game.sass'

function Game() {
    const [validToken,setValidToken]=useState('')
    const [gameBoard,setGameBoard]=useState([['','',''],['','',''],['','','']])
    const [rowHovered,setRowHovered]=useState(-1)
    const [colHovered,setColHovered]=useState(-1)
    const [processing,setIsProcessing]=useState(true)
    const [gameEndStatus,setGameEndStatus]=useState("")
    const [spinnerColor, setColor] = useState("#ffffff")
    const [spinnerSize,setSpinnerSize]=useState(100)

    useEffect(()=>{
        if(!window.sessionStorage.getItem("token")){
            setValidToken(false)
        }
        else{
            setValidToken(true)
            setIsProcessing(false)
        }
    },[])

    const checkEndGameByRow=(board,row)=>{
        for(let col=1;col<board[0].length;col++){
            if(board[row][col]!== board[row][col-1]){
                return false
            }
        }
        return true
    }

    const checkEndGameByCol=(board,col)=>{
        for(let row=1;row<board.length;row++){
            if(board[row][col]!== board[row-1][col]){
                return false
            }
        }
        return true
    }

    const checkEndGameByDiagonal=(board)=>{
        let colNum=board[0].length
        let rowNum=board.length
        let gameEnded=true
        //check for diagonal left to right
        for(let row=1;row<rowNum;row++){
            if(board[row][row]!== board[row-1][row-1]){
                gameEnded=false
                break
            }
        }

        if(gameEnded && board[0][0]!=="") return true

        //check for diagonal right to left
        if(board[rowNum-1][0]==="")
            return false

        for(let row=1;row<board.length;row++){
            if(board[row][colNum- row-1] !== board[row -1][colNum - row]){
                return false
            }
        }

        return true
    }

    const checkIfEndGame=(board,lastMove)=>{
        //check if game ended by row or col
        if(checkEndGameByRow(board,lastMove.row) || checkEndGameByCol(board,lastMove.col)){
            return true
        }
        //check if game ended by diagonal
        if((lastMove.row===lastMove.col || lastMove.row + lastMove.col === board.length-1 ) && checkEndGameByDiagonal(board)){
            return true
        }
        return false
    }

    //the purpose of this func is to find AI row,col last move
    //return false if the arr's identical
    //i assumed that the input is correct in terms of lengths
    const findLastMove =(beforeArr,afterArr)=>{
        for(let rowIndex=0;rowIndex<beforeArr.length;rowIndex++){
            for(let colIndex=0;colIndex<beforeArr[0].length;colIndex++){
                if(beforeArr[rowIndex][colIndex]!==afterArr[rowIndex][colIndex]){
                    return {row:rowIndex,col:colIndex}
                }
            }
        }
        return false
    }


    const onPlayerMove=(row,col)=>{
        if(gameBoard[row][col]!== '')
            return
        setIsProcessing(true)
        let newBoard=[...gameBoard];
        newBoard[row][col]='X'
        setGameBoard(newBoard)

        if(checkIfEndGame(newBoard,{row,col})){
            setGameEndStatus("You Win!")
            setIsProcessing(false)
            return
        }

        axios({
            method: 'post',
            url: 'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/engine',
            data: {
                board: gameBoard,
            },
            headers:{
                Authorization:`Bearer ${window.sessionStorage.getItem("token")}`
            }
        }).then(res=>{
            if(res?.data?.success){
                let lastMove=findLastMove(gameBoard,res.data.board);
                setGameBoard(res.data.board)
                if(checkIfEndGame(res.data.board,lastMove)){
                    setGameEndStatus("AI Win!")
                }
            }else{
                setGameEndStatus("Draw!")
            }
            setIsProcessing(false)
        }).catch(error=>{
            setValidToken(false)
        })
    }

    const onSquareHover=(row,col)=>{
        setRowHovered(row)
        setColHovered(col)
    }

    const onResetGame =()=>{
        setGameBoard([['','',''],['','',''],['','','']])
        setGameEndStatus("")
    }

    if(validToken==='') return (
        <div className="Game-modal"><Spinner color={spinnerColor} loading={processing}  size={spinnerSize} /></div>
    )
    if(!validToken) return <Redirect to="/signup"></Redirect>
    return (
        <div className="Game">
            <h1>Game</h1>
            <GameTable>
                {gameBoard?.map((rowElement,rowIndex)=>{
                    return (
                        <GameRow key={rowIndex}>
                            {rowElement?.map((colElement,colIndex)=>{
                                return(
                                    <GameSquare key={rowIndex + ',' + colIndex} value={colElement}
                                                row={rowIndex} col={colIndex}
                                                isHighlighted={rowIndex===rowHovered || colIndex===colHovered}
                                                onSquareHover={onSquareHover} onPlayerMove={onPlayerMove}/>
                                )
                            })}
                        </GameRow>
                    )
                })}
            </GameTable>

            {processing && (
                <div className="Game-modal">
                    <Spinner color={spinnerColor} loading={processing} size={spinnerSize} />
                </div>)}

            {gameEndStatus!=="" && (
                <div className="Game-modal">
                    <span>
                        {gameEndStatus}
                    </span>
                     <button onClick={onResetGame} type="button" className="btn btn-primary btn-lg">Reset Game</button>
                </div>)}
        </div>
    )
};

export default Game

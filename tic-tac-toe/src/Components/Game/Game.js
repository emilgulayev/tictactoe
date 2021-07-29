import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/react"
import './Game.sass'

function Game() {

    const [validToken,setValidtoken]=useState('')
    const [color, setColor] = useState("#ffffff")

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `

    useEffect(()=>{
        if(!window.sessionStorage.getItem("token")) setValidtoken(false)
        else setValidtoken(true)
    },[])

    if(validToken==='') return <ClipLoader color={color} loading={true} css={override} size={100} />
    if(!validToken) return <Redirect to="/signup"></Redirect>
    return (
        <div className="Game">
            <h1>Game</h1>
        </div>
    );
}

export default Game;

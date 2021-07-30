import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import { css } from "@emotion/react"
import './Game.sass'

function Game() {

    const [validToken,setValidtoken]=useState('')

    useEffect(()=>{
        if(!window.sessionStorage.getItem("token")) setValidtoken(false)
        else setValidtoken(true)
    },[])

    if(validToken==='') return <div>Redirecting...</div>
    if(!validToken) return <Redirect to="/signup"></Redirect>
    return (
        <div className="Game">
            <h1>Game</h1>
        </div>
    );
}

export default Game;

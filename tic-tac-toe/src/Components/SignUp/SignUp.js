import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/react"
import './SignUp.sass'

function SignUp() {

    const [userEmail,setUserEmail]= useState("")
    const [isLogging,setIsLogging]=useState(false)
    const [token,setToken]=useState('')
    const [color, setColor] = useState("#ffffff")

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `

    function userChangeEmail(e){
        setUserEmail(e.target.value)
    }

    function onLogin(e){
        e.preventDefault()
        if(userEmail===''){
            alert("Email field is empty, please fill it")
            return
        }
        setIsLogging(true);
        axios({
            method: 'post',
            url: 'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/auth',
            data: {
                email: userEmail,
            }
        }).then(res=>{
            //check if successfully got token
            if(res?.data?.success){
                window.sessionStorage.setItem("token",res.data.token)
                setToken(res.data?.success)
            }else{
                alert("Sign up failed,please try again")
            }
        }).catch(error=>{
            alert(error)
        }).finally(()=>{
            setIsLogging(false)
        })
    }

    if(token!==''){
        return <Redirect to="/game"></Redirect>
    }
    else return (
        <div className="SignUp">
            <h1>Sign Up</h1>
            <ClipLoader color={color} loading={isLogging} css={override} size={100} />
            <div className="SignUp-container">
                <div>
                    <span>Email</span>
                    <form onSubmit={onLogin}>
                        <input type="email" className="form-control"   aria-label="Email" onChange={userChangeEmail}/>
                        <button type="submit" className="btn btn-primary"  disabled={isLogging}>Login</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default SignUp;

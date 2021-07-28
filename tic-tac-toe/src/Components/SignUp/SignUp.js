import React,{useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/react"
import './SignUp.sass'

function SignUp() {

    const [userEmail,setUserEmail]= useState("")
    const [isLogging,setIsLogging]=useState(false)
    const [color, setColor] = useState("#ffffff")

    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `

    function userChangeEmail(e){
        console.log("changed value to:",e.target.value)
        setUserEmail(e.target.value)
    }

    function onLogin(){
        setIsLogging(true);
    }
    return (
        <div className="SignUp">
            <h1>Sign Up</h1>
            <ClipLoader color={color} loading={isLogging} css={override} size={100} />
            <div className="SignUp-container">
                <div>
                    <span>Email:</span>
                    <input type="text"  placeholder="Email" aria-label="Email" onChange={e=>userChangeEmail(e)}/>
                    <button type="button" className="btn btn-primary" onClick={onLogin} disabled={isLogging}>Login</button>
                </div>

            </div>


        </div>
    );
}

export default SignUp;

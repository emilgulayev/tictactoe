import React,{useState} from 'react'
import './SignUp.sass'

function SignUp() {

    const [userEmail,setUserEmail]= useState("")

    function userChangeEmail(e){
        console.log("changed value to:",e.target.value)
        setUserEmail(e.target.value)
    }
    return (
        <div className="SignUp">
            <h1>Sign Up</h1>
            <div className="SignUp-container">
                <div>
                    <span>Email:</span>
                    <input type="text"  placeholder="Email" aria-label="Email" onChange={e=>userChangeEmail(e)} />
                    <button type="button" className="btn btn-primary">Login</button>
                </div>

            </div>


        </div>
    );
}

export default SignUp;

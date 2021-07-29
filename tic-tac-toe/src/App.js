import React,{useState,useEffect} from 'react'
import {
    Route,
    Switch,
    BrowserRouter,
    Redirect,
} from 'react-router-dom'

import SignUp from './Components/SignUp/SignUp'
import Game from './Components/Game/Game'

function requireAuth(nextState, replace, next) {
    console.log("token",window.sessionStorage.getItem("token"))
    if (!window.sessionStorage.getItem("token")) {
        replace({
            pathname: "/signup",
            state: {nextPathname: nextState.location.pathname}
        });
    }else{
        replace({
            pathname: "/game",
            state: {nextPathname: nextState.location.pathname}
        });
    }
    next();
}

function App() {
    const [token,setToken] = useState("")

  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={()=>(
                    window.sessionStorage.getItem("token")? (<Redirect to="/game"/>) :
                        (<Redirect to="/signup"/>)
                )}></Route>
                <Route path="/signup" component={SignUp} ></Route>
                <Route path="/game" component={Game} ></Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

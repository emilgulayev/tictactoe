import React,{useState,useEffect} from 'react'
import {
    Route,
    Switch,
    BrowserRouter,
} from 'react-router-dom'

import SignUp from './Components/SignUp/SignUp'

function requireAuth(nextState, replace, next) {
    if (!window.sessionStorage.getItem("token")) {
        replace({
            pathname: "/signup",
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
                <Route path="/" component={SignUp} onEnter={requireAuth}></Route>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

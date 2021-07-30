import React from 'react'
import {
    Route,
    Switch,
    BrowserRouter,
    Redirect,
} from 'react-router-dom'

import SignUp from './Components/SignUp/SignUp'
import Game from './Components/Game/Game'

function App() {

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

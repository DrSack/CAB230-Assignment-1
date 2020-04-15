import React, { useState } from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import {HeaderComponent} from './Pages//Routing/Header';
import {LoginRegister} from './Pages/Main-Component/LoginRegister'
import {Footer} from './Pages/Main-Component/Footer'
import {RoutingComponent} from"./Pages/Routing/Routes"

export default function App() {
  const [truth, settruth] = useState(false);
  const [state, setstate] = useState("");
  const [opa, setopa] = useState("100%");
  const [Token, setToken] = useState("");

  return (
    <Router>
      <div className="App">
      <LoginRegister onSubmit={settruth} True={truth} status={state} onOpacity={setopa} onToken={setToken}/>
      <div style={{opacity: opa}}>
        <HeaderComponent name1 ="Home"  name2 ="Stocks"  name3 ="Stocks(Auth)" onSubmit={settruth} onSubmit2={setstate} onSubmit3={setopa}/>
      <RoutingComponent onSubmit={settruth} onSubmit2={setstate} onSubmit3={setopa} token={Token}/>
      <Footer/>
    </div>
    </div>
  </Router>
  );
}
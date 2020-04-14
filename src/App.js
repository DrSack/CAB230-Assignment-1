import React, { useState } from "react";
import { BrowserRouter as Router} from 'react-router-dom';

import "./App.css";
import {HeaderComponent} from './Pages//Routing/Header';
import {LoginRegister} from './Pages/LoginRegister-Component/LoginRegister'
import Routes from './Pages/Routing/Routes';

export default function App() {
  const [truth, settruth] = useState(false);
  const [state, setstate] = useState("");

  return (
    <Router>
      <div className="App">
      <LoginRegister onSubmit={settruth} True={truth} status={state}/>
        <HeaderComponent name1 ="Home"  name2 ="Stocks"  name3 ="Contact"  name4 ="Spaces" onSubmit={settruth} onSubmit2={setstate}/>
        <Routes/>
        <footer style={{
          width: "100%",
          marginTop: "30px"
  }}><h3 style={{fontSize: "2.5vh", fontWeight: "bold", float: "left", paddingLeft: "3vh"}}>Massive Stonks LTD</h3>
  <p style={{fontSize: "1.5vh", clear: "left",float: "left", paddingLeft: "3vh", paddingBottom: "3vh"}}>The Stonks takes peronal information very seriously.</p>
  </footer>
    </div>
  </Router>
  );
}
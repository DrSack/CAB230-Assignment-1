//Import all dependencies.
import React, { useState } from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import  components and styling.
import "./App.css";
import {HeaderComponent} from './Pages//Routing/Header';
import {LoginRegister} from './Pages/Main-Component/LoginRegister'
import {Footer} from './Pages/Main-Component/Footer'
import {RoutingComponent} from"./Pages/Routing/Routes"

/*
Parameter: None

Displays the entire application and all its routes and functionalities

Returns: Entire Application
*/

export default function App() {//Declare all usestates to be passed.
  const [truth, settruth] = useState(false);// Set Truth value to enable LoginRegister component.
  const [state, setstate] = useState("");// Set use state for login or register for LoginRegister component.
  const [opa, setopa] = useState("100%");// Set opacity for main divtag
  const [Token, setToken] = useState("");// Set JWT token from LoginRegister component to StockAuth component

  return(
  //Return App Interface
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
import React, { useState } from "react";
import * as style from '../../Styling/Styling';
import history from '../Routing/History';
import { Link } from "react-router-dom";

export const HeaderComponent = function(props){
  const [Truth, SetTruth] = useState(true);

    return(
      <div style={style.style2}>
        <div style={{width: "100%"}}>
        <div style={style.style3}>
          <p style={{fontSize: "2.5vh", fontWeight: "bold"}}>Massive Stonks LTD</p>
        </div>
      <div style={style.style}>
        <Link to="/" style={style.banner} onClick={() => history.push('/')}>{props.name1}</Link>
        <Link to="/Stocks" style={style.banner} onClick={() => history.push('/Stocks')}>{props.name2}</Link>
        <Link to="/Contact" style={style.banner} onClick={() => history.push('/Contact')}>{props.name3}</Link>
        <Link to="/Spaces" style={style.banner}  onClick={() => history.push('/Spaces')}>{props.name4}</Link>
        <div style={{display: "flex", whiteSpace: "nowrap", float: "right", marginRight: "10vh",
            height: "90px",
            lineHeight: "90px",
            textAlign: "left",}}>
          <a href= "#0"style={{display: "flex", fontSize: "1.5vh"}} onClick={() => {SetTruth(true); props.onSubmit(Truth); props.onSubmit2("Login")}}>Login</a>
          <a href= "#0" style={{display: "flex", fontSize: "2.3vh", marginLeft: "10px", marginRight: "10px"}}>|</a>
          <a href= "#0" style={{display: "flex", fontSize: "1.5vh"}} onClick={() => {SetTruth(true); props.onSubmit(Truth); props.onSubmit2("Register")}}>Register</a>
        </div>
      </div>
      
      </div>
      </div>
    );
}
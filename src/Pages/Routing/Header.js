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
        <Link to="/Spaces" style={style.banner}  onClick={() => history.push('/Spaces')}>{props.name3}</Link>
        <div style={{display: "flex", whiteSpace: "nowrap", float: "right", marginRight: "10vh",
            height: "90px",
            lineHeight: "90px",
            textAlign: "left",}}>
            <Link to="/" style={{display: "flex", fontSize: "1.5vh"}} onClick={() => {SetTruth(true); props.onSubmit(Truth); props.onSubmit2("Login"); props.onSubmit3("40%")}}>Login</Link>
          <p style={{display: "flex", fontSize: "2.6vh", marginLeft: "10px", marginRight: "10px" ,color: "black"}}>|</p>
            <Link to="/" style={{display: "flex", fontSize: "1.5vh"}} onClick={() => {SetTruth(true); props.onSubmit(Truth); props.onSubmit2("Register"); props.onSubmit3("40%")}}>Register</Link>
        </div>
      </div>
      
      </div>
      </div>
    );
}
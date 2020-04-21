import React, { useState } from "react";// import all dependencies
import * as style from '../../Styling/Styling';
import history from '../Routing/History';
import { Link } from "react-router-dom";

/*
Parameter: props=OnSubmit to open logRegister component.

Display Navigation bar that has Link components that push towards different pages.

Returns: Navigation bar
*/


export const HeaderComponent = function(props){
  const [Truth, SetTruth] = useState(true);//Set use state Truth

    if(props.Token!==""){
      return(
      <div style={style.style2}>
        <div style={{width: "100%"}}>
        <div style={style.style3}>
          <p style={{fontSize: "2.5vh", fontWeight: "bold"}}>Massive Stonks LTD</p>
        </div>
      <div style={style.style}>
        <Link to="/" style={style.banner} onClick={() => history.push('/')}>{props.name1}</Link>
        <Link to="/Stocks" style={style.banner} onClick={() => history.push('/Stocks')}>{props.name2}</Link>
        <Link to="/StocksAuthed" style={style.banner}  onClick={() => history.push('/StocksAuthed')}>{props.name3}</Link>
        <div style={{display: "flex", whiteSpace: "nowrap", float: "right", marginRight: "10vh",
            height: "90px",
            lineHeight: "90px",
            textAlign: "left",}}>
            <Link to="/" style={{display: "flex", fontSize: "1.5vh"}} onClick={() => {props.onToken("")}}>Sign Out</Link>
        </div>
      </div>
      
      </div>
      </div>
      )
    }

    return(
      <div style={style.style2}>
        <div style={{width: "100%"}}>
        <div style={style.style3}>
          <p style={{fontSize: "2.5vh", fontWeight: "bold"}}>Massive Stonks LTD</p>
        </div>
      <div style={style.style}>
        <Link to="/" style={style.banner} onClick={() => history.push('/')}>{props.name1}</Link>
        <Link to="/Stocks" style={style.banner} onClick={() => history.push('/Stocks')}>{props.name2}</Link>
        <Link to="/StocksAuthed" style={style.banner}  onClick={() => history.push('/StocksAuthed')}>{props.name3}</Link>
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
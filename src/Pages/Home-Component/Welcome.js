import React, { useState } from "react";//import react
import StockImage from "../../Images/stock-trade-image-png-3-original.png";//import images

/*
  Parameters: props= set OnSubmit props to send data towards LoginRegisters

  Displays Welcome page including a get started button which displays overlay

  Return: The Welcome page 
*/

export const Welcome = function(props){
  const [Truth, SetTruth] = useState(true);//Set truth use state.
  
  return(
    <div style={{height: "91vh", background: "linear-gradient(to bottom, #FFFFFF -1%, #537895 100%)", fontFamily:"Titillium Web", textAlign: "center"}}>
          <p></p>
        <div style={{display: "flex", marginTop: "10vh"}}>
          <div style={{width: "70%", margin: "0 auto"}}>
            <img style={{width: "500px", height: "250px"}} src={StockImage} alt="logo"/>
          </div>
          <div style={{width: "70%"}}>
            <h2 style={{fontSize: "60px", color: "Black", marginBottom: "-25px"}}>"The Stonks Will Rise"</h2>
            <p style={{marginBottom: "-10px", padding: "0px", color: "black", marginTop: "20px", fontSize: "20px"}}>- Travis Mangila</p>
            <div style={{fontSize: "20px", marginTop: "55px"}}>
              <p style={{marginTop: "30px", padding: "0px", color: "black"}}>Welcome to the <strong>Massive Stonks LTD</strong> portal page,</p>
              <p style={{marginTop: "-10px", padding: "0px", color: "black"}}>this is the Stonk Analyst Home Page.</p>
              <p style={{marginTop: "10px", padding: "0px", color: "black"}}>If you are a reoccuring member please <strong>Login</strong></p>
              <p style={{marginTop: "-10px", padding: "0px", color: "black"}}>to review the latest and exclusive Stonks.</p>
            </div>
          </div>
      </div>
      <p style={{marginTop: "17vh", fontSize: "20px"}}><strong>If you are new Click Here</strong></p>
        <button style={{
        color: "black", 
        background: "white" ,
        opacity: "0.7",
        fontSize: "3vh", 
        borderRadius: "6px", 
        border: "none",
        width: "30vh",
        fontWeight: "bold",
          }}
        onClick={() => {SetTruth(true); props.onSubmit(Truth); props.onSubmit2("Register"); props.onSubmit3("40%")}}// Change props when button is clicked.
          >Get Started</button>
    </div>
  )
}
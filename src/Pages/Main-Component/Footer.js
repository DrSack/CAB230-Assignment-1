import React from "react";//import react

/*
  Parameters: Nothing

  This is returns a Static design of the footer
  
  returns: footer design
*/

export const Footer = function(){
    return(
      <div>
        <footer style={{width: "100%", marginTop: "30px"}}>
            <h3 style={{fontSize: "2.5vh", fontWeight: "bold", float: "left", paddingLeft: "3vh"}}>Massive Stonks LTD</h3>
            <p style={{fontSize: "1.5vh", clear: "left",float: "left", paddingLeft: "3vh", paddingBottom: "3vh"}}>Find all the stonks you need, gain the power.</p>
        </footer>
      </div>
    )
}
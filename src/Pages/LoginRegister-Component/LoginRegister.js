import React, { useState } from "react";

export const LoginRegister = function(props){
    const [Truth, SetTruth] = useState(false);
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");

    function ConvertJSON(email,password){
        const obj = 
            {
                "email": email,
                "password": password
                
            }
        return obj;
    }

    if(!props.True){
        return null;
    }

    else if(props.True === true){
        return(
            <div style=
            {{position: "fixed",
            top: "25%",
            left: "39%",
            height:"50vh",
            width: "40vh",
            backgroundColor: "White",
            border: "2px solid Black",
            zIndex: "1"}}>
                <button style={{ float: "right"}}
                onClick={() => {SetTruth(false); props.onSubmit(Truth)}}
                >X</button>
                <h1 style={{display: "flex"}}>
                    Sign In
                </h1>
                <div>
                    <label style={{display: "flex"}}>Email Address</label>
                    <input value={Email} onChange={e => SetEmail(e.target.value)}></input>
                    <label style={{display: "flex"}}>Password</label>
                    <input value={Password} onChange={e => SetPassword(e.target.value)}></input>
                </div>
                <div>
                    <button style={{clear: "left", width: "100px", marginTop: "2vh"}} onClick={() => console.log(ConvertJSON(Email,Password))}>{props.status}</button>
                </div>
            </div>
          );
    }
}
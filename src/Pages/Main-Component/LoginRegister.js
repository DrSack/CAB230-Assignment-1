import React, { useState } from "react";

function Post(Rego, Type){
  const postRequest = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(Rego)
  }
  if(Type === 'Login')
  return fetch('http://131.181.190.87:3000/user/login', postRequest)
  .then(response => response.json())
  .then(res => res).catch(() => {return {
    error: true,
    message: "Can't connect to Server",
  }})
  else{
    return fetch('http://131.181.190.87:3000/user/register', postRequest)
    .then(response => response.json())
    .then(res => res).catch(() => {return {
      error: true,
      message: "Can't connect to Server",
    }})
  }
}

export const LoginRegister = function(props){
    const [Truth, SetTruth] = useState(false);
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const [Response, SetResponse] = useState("");

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

    if(props.True === true){
        return(
            <div style={{height: "1vh",
                width: "0",
                position: "fixed",
                zIndex: "1",
                top: "25%",
                right: "50%",
                left: "41.7%",
                }}>
                <button style={{float: "left", height: "2.7vh", fontSize: "1.3vh", textAlign: "center", verticalAlign: "middle", margin: "0 auto"}}
                onClick={() => {SetResponse(""); SetTruth(false); props.onSubmit(Truth); props.onOpacity("100%")}}
                >X</button>
      <form
        onSubmit={function(event) {
          Post(ConvertJSON(Email,Password),props.status)
          .then((message) => {
            if(message.error){
              SetResponse(message.message);
            }
            else if(message.success){
              SetResponse(message.message);
            }
            else{
              props.onToken(message.token);
              SetResponse("Successfully Logged In");
            }
          })
          event.preventDefault();
        }}
        style={{
          borderRadius: "2vh",
          height: "40vh",
          fontFamily: "Verdana",
          width: "30vh",
          border: ".5vh solid black",
          paddingTop: "2vh",
          paddingBottom: "2vh",
          margin: "0 auto",
          background: "white",
          overflow: "hidden"
        }}
      >
        <p style={{ textAlign: "center", fontSize: "2vh", margin:"0 auto", marginBottom: "6vh"}}>Sign In</p>
        <input
        placeholder="Email"
          style={{
            display: "flex",
            width: "20vh",
            margin: "0 auto",
            marginBottom: "1.1vh",
           fontSize: "1.3vh"
          }}
          type="text"
          onChange={e => SetEmail(e.target.value)}
        />
        <input
        placeholder="Password"
          style={{
            display: "flex",
            width: "20vh",
            margin: "0 auto",
            fontSize: "1.3vh"
          }}
          type="password"
          onChange={e => SetPassword(e.target.value)}
        />
        <input
          style={{
            display: "block",
            margin: "0 auto",
            height: "3.5vh",
            width: "20.4vh",
            marginTop: "1vh",
            fontSize: "1.3vh",
            textAlign: "center",
            background: "#008081",
            color: "white",
            border: "0px solid black"
          }}
          type="submit"
          value={props.status}
        />
        <footer style={{fontSize:"1.3vh", paddingTop: "2vh", margin: "auto", textAlign:"center"}}>{Response}</footer>
      </form>
    </div>
          );
    }

}
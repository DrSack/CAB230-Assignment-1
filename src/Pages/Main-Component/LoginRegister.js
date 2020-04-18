import React, { useState } from "react";//import react and use state

/*
Parameter: Rego= Takes Json Object, Type=String either Login or Register

Sends a post request to API, and waits for response, or catch an error if cant connect.
This function allows the user to login or register into the server.


Returns: JSON Object with message, Error Message, or JWT Token.
*/

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

/*
Parameter: props=passes data from component

Component displays the login overlay and allows the user to input their
email and password, to then be sent to the server in which they are authenticated or denied.

Returns: The Register/Login Overlay. Or nothing if the props.True is false.
*/


export const LoginRegister = function(props){
    const [Truth, SetTruth] = useState(false);//Set use states
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
    
    if(!props.True){// return nothing is false
        return null;
    }

    if(props.True === true){// Return overlay if true
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
        onSubmit={function(event) {//If the form is submitted
          Post(ConvertJSON(Email,Password),props.status)
          .then((message) => {
            if(message.error){//Check if error === true
              SetResponse(message.message);// Then set response.
            }
            else if(message.success){//if success === true
              SetResponse(message.message);//Set response
            }
            else{//success on login
              props.onToken(message.token);//Set props to token
              SetResponse("Successfully Logged In");//Set response to succesful login
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
          onChange={e => SetEmail(e.target.value)}//Set email to onChange value.
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
          onChange={e => SetPassword(e.target.value)}//Set password to onChange value.
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
import React from "react";

export const InputStuff = function(){
    let PERSON = {name: "", job: "", age: 0}
  
    function PostMessage(title){
      fetch(' https://127.0.0.2:8000/data' , {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: title.name,
          job: title.job,
          age: title.age,
        })
      }).then((response) => {console.log("Status", response.status)})
      .catch((error) => {console.log("Failed: ", error)});
    }
  
    return(
      <div>
          <div style={{width: "340px", border: "1px solid black", margin: "auto"}}>
            <div style={{paddingTop: "10px", paddingRight: "5px"}}>
            <p  style={{display: "inline-block", fontSize: "20px"}}>Input Name:</p>
            <input style={{marginLeft: "20px", width: "190px", float: "right"}} onChange={event => PERSON.name = event.target.value}></input>
            </div>
            <div style={{paddingTop: "10px", paddingRight: "5px"}}>
            <p  style={{display: "inline-block", fontSize: "20px"}}>Input Job:</p>
            <input style={{marginLeft: "20px", width: "190px", float: "right"}} onChange={event => PERSON.job = event.target.value}></input>
            </div>
            <div style={{paddingTop: "10px", paddingRight: "5px"}}>
            <p  style={{display: "inline-block", fontSize: "20px"}}>Input Age:</p>
            <input style={{marginLeft: "20px", width: "190px", float: "right"}} onChange={event => PERSON.age = event.target.value}></input>
            </div>
            <button style={{marginLeft: "20px"}} onClick={ () => PostMessage(PERSON)} >POST</button>
          </div>
      </div>
    )
  }
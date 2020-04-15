import React, {useState} from "react";
import {AgGridReact} from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import "bootstrap/dist/css/bootstrap.min.css"
//import {Button, Badge} from "reactstrap";

const Columns = [
  { headerName: "Timestamp", field: "timestamp"},
  { headerName: "Symbol", field: "symbol"},
  { headerName: "Name", field: "name"},
  { headerName: "Industry", field: "industry"},
  { headerName: "Open", field: "open"},
  { headerName: "High", field: "high"},
  { headerName: "Low", field: "low"},
  { headerName: "Close", field: "close"},
  { headerName: "Volumes", field: "volumes"},
];


function getAuth(GetRequest){
    return fetch("http://131.181.190.87:3000/stocks/authed/AAL", GetRequest)
            .then(res => res.json())
            .then(res => { return res})
}



export const Table = function(props){
    const GetRequest = {
        headers: {'Authorization': `Bearer ${props.token}`},
    }
    let [Stock, setStock] = useState([]);
    if(props.token !== ""){

            getAuth(GetRequest)
                    .then(res => {
                        let arr = [res];
                        setStock(arr);
                    })
    }
        
    return(
    <div>
      <div style={{width: "80%", margin: "0 auto"}}>
        <h1 style={{textAlign: "left"}}>Stocks Authenticated</h1>
        <div className="ag-theme-balham" style={{height: "500px", width: "100%", margin: "auto"}}>
        <AgGridReact columnDefs={Columns} rowData={Stock} pagination={true}/>
        </div>
        </div>
      </div>
    )
  }
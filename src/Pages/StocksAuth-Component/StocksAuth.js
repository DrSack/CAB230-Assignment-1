import React, {useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import * as moment from 'moment';
import {DateRange} from './DateRange'

import "bootstrap/dist/css/bootstrap.min.css"

const Notfound = [{
  timestamp: "Not Found",
    symbol: "Not Found",
    name: "Not Found",
    industry: "Not Found",
    open: "Not Found",
    high: "Not Found",
    low: "Not Found",
    close: "Not Found",
    volumes: "Not Found",
}]



function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  return (
    <div>
      <input
        aria-labelledby="search-button"
        name="search"
        id="search"
        type="search"
        value={innerSearch}
        onChange={e => setInnerSearch(e.target.value)}
        style={{width: "90%"}}
      />
      <button
        id="search-button"
        type="button"
        onClick={() => props.onSubmit(innerSearch)}
        style={{width: "10%"}}
      >
        Search
      </button>
    </div>
  );
}

function getType(p) {
  if (Array.isArray(p)) return 'array';
  else if (typeof p == 'string') return 'string';
  else if (p != null && typeof p == 'object') return 'object';
  else return 'other';
}

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


function getAuth(GetRequest, symbol, date){
  let url = `http://131.181.190.87:3000/stocks/authed/${symbol}`;
  let statusNum; let date1; let date2; 

  try{
    date1 = moment(date[0]).format('YYYY-MM-DD')
    date2 = moment(date[1]).format('YYYY-MM-DD')
    url+=`?from=${date1}T00%3A00%3A00.000Z&to=${date2}T00%3A00%3A00.000Z`;
  }catch{

  }

    return fetch(url, GetRequest)
            .then(res => { statusNum = res.status; return res.json()})
            .then(res => {
              if(res.error){
                return {
                  status: statusNum,
                  error: res.error,
                  message: res.message,
                }
              }
              else{
                return res;
              }
            }).catch(() => {return {
              status: 444,
              error: true,
              message: "Disconnected",
            }})
          
}



export const StocksAuth = function(props){
  const [symbol, setsymbol] = useState("");
  const [error, seterror] = useState("");
  const [truth, settruth] = useState(true);
  const [date, setdate] = useState(null);

    const GetRequest = {
        headers: {'Authorization': `Bearer ${props.token}`},
    }
    
    let [Stock, setStock] = useState([]);
    useEffect(() => {
      setsymbol(symbol);
      seterror(error);
      settruth(truth);
      setdate(date);
      // eslint-disable-next-line
    }, [symbol, date, error, GetRequest]);  
      useEffect(() => {
        getAuth(GetRequest,symbol,date)
        .then(res => {
          if(props.token === ""){
            seterror("Please Login");
          }
          else{
            if(res.error){
              if(truth){
                if(res.status === 444){
                  seterror(`Status: ${res.status}--Error: ${res.message}`);
                }
                else{
                  settruth(false);
                }
            }
            else{
              seterror(`Status: ${res.status}--Error: ${res.message}`);
              setStock(Notfound);
            }
            }
            else{
            if(getType(res) === 'object'){
              seterror("");
              let arr = [res];
              setStock(arr);
            }
            else if(getType(res) === 'array'){
              seterror("");
              setStock(res);
            }
            }
          }
          }
        )
        // eslint-disable-next-line
      }, [symbol, date, error, GetRequest, truth]);     
        
    

    return(
    <div style={{background: "linear-gradient(to bottom, #FFFFFF -1%, #537895 100%)", paddingBottom: "13vh"}}>
      <div style={{width: "80%", margin: "0 auto"}}>
      
        <div className="ag-theme-balham" style={{height: "500px", width: "100%", margin: "auto"}}>
        <h2 style={{textAlign: "left"}}>Stocks Authenticated<span style={{fontSize: "13px", textAlign: "right"}}>{error}</span></h2>
        <SearchBar onSubmit={setsymbol} />
        <DateRange onDate={setdate}/>
        <AgGridReact columnDefs={Columns} rowData={Stock} pagination={true}/>
        </div>
        </div>
      </div>
    )
  }
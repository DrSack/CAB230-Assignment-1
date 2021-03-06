import React, {useState, useEffect} from "react";//import dependencies
import {AgGridReact} from "ag-grid-react"
import {DateRange} from './DateRange'
import { Chart } from "react-google-charts";//import chart
import * as moment from 'moment';

import "ag-grid-community/dist/styles/ag-grid.css";//Set styles
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css"

const Notfound = [{// set const JSON object to Not Found.
  timestamp: "Null",
    symbol: "Not Found",
    name: "Not Found",
    industry: "Not Found",
    open: "Not Found",
    high: "Not Found",
    low: "Not Found",
    close: "Not Found",
    volumes: 0,
}]

function GenerateJSON(obj){//Check object length and return specific ararys
  if(obj.length === 0){
    return [
      ['TimeFrame', 'Volume'],
      ['Null', 0]
    ];
  }
  else if(obj.error){
    return [
      ['TimeFrame', 'Volume'],
      ['Null', 0]
    ];
  }
  else{
    let purest = [
      ['TimeFrame', 'Volume']
    ]
    obj.map((objk) => purest.push(
      [objk.timestamp, objk.volumes]
    ))
    return purest;
  }
}


/*
Parameter: props=OnSubmit to pass value to StockAuth component.

Send onChange value of input and pass through this component.

CODE SNIPPET INSPIRED FROM ReactSearch.pdf within QUT BlackBoard.

Returns: Input bar and button component.
*/

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
        onClick={() => {if(innerSearch === ""){ alert("Please provide valid input")} else return props.onSubmit(innerSearch)}}
        style={{width: "10%"}}
      >
        Search
      </button>
    </div>
  );
}

/*
Parameter: p=pass either array, typeof, or object

Pass in either array, typeof, or object

CODE SNIPPET INSPIRED FROM Stack Overflow
@ref: https://stackoverflow.com/questions/11182924/how-to-check-if-javascript-object-is-json

Returns: string value to determine type of variable
*/

function getType(p) {
  if (Array.isArray(p)) return 'array';
  else if (typeof p == 'string') return 'string';
  else if (p != null && typeof p == 'object') return 'object';
  else return 'other';
}

const Columns = [// set const JSON to reflect the stock JSON object
  { headerName: "Date", field: "timestamp"},
  { headerName: "Symbol", field: "symbol"},
  { headerName: "Name", field: "name"},
  { headerName: "Industry", field: "industry"},
  { headerName: "Open", field: "open", sortable: true},
  { headerName: "High", field: "high", sortable: true},
  { headerName: "Low", field: "low", sortable: true},
  { headerName: "Close", field: "close", sortable: true},
];


/*
Parameter: Get Request= , symbol= pass symbol, date= pass date object

A GET request to the stocks/authed/{symbol} route.
Provides the symbol, the token in the GetRequest JSON, and date object 

Returns: JSON object of either a successful pull or an error.
*/

function getAuth(token, symbol, date){
  let url = `http://131.181.190.87:3000/stocks/authed/${symbol}`;
  let statusNum; let date1; let date2; 

  let GetRequest = {
    headers: {'Authorization': `Bearer ${token}`},
  }

  try{
    date1 = moment(date[0]).format('YYYY-MM-DD')
    date2 = moment(date[1]).format('YYYY-MM-DD')
    url+=`?from=${date1}T00%3A00%3A00.000Z&to=${date2}T00%3A00%3A00.000Z`;
  }catch{}
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

/*
Parameter: props=props.token is passed down from the App.js component

Returns Ag-grid components that displays stocks for authenticated users for specific Industries Symbols and a timelapse. 

Returns: Displays the Ag-grid and Google Charts for Authenticated Stocks.
*/

export const StocksAuth = function(props){
  const [symbol, setsymbol] = useState("");//Set usestates
  const [error, seterror] = useState("");
  const [date, setdate] = useState(null);
    
    let [Stock, setStock] = useState([]); 
      useEffect(() => {
        getAuth(props.token,symbol,date)
        .then(res => {
          if(props.token === ""){//If no token is present dont set anything
            if(res.status === 444){//If disconnected
              seterror(`Status: ${res.status}--Error: ${res.message}`);
            }
            else{
              seterror("Please Login to access Authenticated Stocks");
              setStock(Notfound);
            }
          }
          else{
            if(symbol === ""){//If Searchbar is nothing
              seterror("");
            }
            else if(res.error){//If error is true
                if(res.status === 444){
                  seterror(`Status: ${res.status}--Error: ${res.message}`);
                }
              else{
                  seterror(`Status: ${res.status}--Error: ${res.message}`);
                  setStock(Notfound);
              }
            }
            else{//If successful
            if(getType(res) === 'object'){//If single object
              seterror("");
              let str = res.timestamp;
              let split = str.slice(0,10);
              res.timestamp = split;
              let arr = [res];
              arr.reverse();
              setStock(arr);
            }
            else if(getType(res) === 'array'){//If Multiple objects
              seterror("");
              for(let i = 0; i < res.length; i++){//modify the timestamp to online display the date
                let str = res[i].timestamp;
                let split = str.slice(0,10);
                res[i].timestamp = split;
              }
              res.reverse();//reverse the order to display correctly within timeline
              setStock(res);
            }
            }
          }
          }
        )
      }, [symbol,date,props.token]);     
        
    return(
    <div style={{background: "linear-gradient(to bottom, #FFFFFF -1%, #537895 100%)", paddingBottom: "50vh"}}>
      <div style={{width: "80%", margin: "0 auto", marginTop: "1%"}}>
        <div className="ag-theme-balham" style={{height: "400px", width: "100%", margin: "auto"}}>
        <h2 style={{textAlign: "left"}}>Stocks Authenticated<span style={{fontSize: "13px", textAlign: "right"}}>{error}</span></h2>
        <SearchBar onSubmit={setsymbol} />
        <DateRange onDate={setdate}/>
        <AgGridReact columnDefs={Columns} rowData={Stock} pagination={true}/>
        <Chart
          width={'100%'}
          height={'200px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={GenerateJSON(Stock)}
          options={{
            pointSize: 10,
            title: `Volume Quantity Timelapse`,
            hAxis: {
              title: 'Timelapse',
            },
            vAxis: {
              title: 'Volume',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        </div>
        </div>
      </div>
    )
  }
import React, {useState,useEffect} from "react";// Set dependencies
import Select from "react-select";

import {AgGridReact} from "ag-grid-react";//import  GridReact
import { Chart } from "react-google-charts";//import chart

import "ag-grid-community/dist/styles/ag-grid.css";//Import themes
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css"

const Notfound = [{// set const JSON 
  timestamp: "Not Found",
    symbol: "Not Found",
    name: "Not Found",
    industry: "Not Found",
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volumes: 0,
}]

const techCompanies = [// Set const JSON for selecting industries
  { label: "<Empty>", value: 0},
  { label: "Health Care", value: 1 },
  { label: "Industrial", value: 2 },
  { label: "Consumer Discretionary", value: 3 },
  { label: "Information Technology", value: 4 },
  { label: "Consumer Staples", value: 5 },
  { label: "Utilities", value: 6 },
  { label: "Financials", value: 7 },
  { label: "Real Estate", value: 8 },
  { label: "Materials", value: 9 },
  { label: "Energy", value: 10 },
  { label: "Telecommunication Services", value: 11 },
];

const Columns = [// Define columns
  { headerName: "Name", field: "name", sortable: true, filter: true},
  { headerName: "Symbol", field: "symbol", sortable: true},
  { headerName: "Industry", field: "industry", sortable: true},
];

/*
Parameter: props=OnSubmit to pass value to Stock component.

Send onChange value of input and pass through this component.

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
        onClick={() => props.onSubmit(innerSearch)}
        style={{width: "10%"}}
      >
        Search
      </button>
    </div>
  );
}

/*
Parameter: symbol= the search usestate

Returns the JSON data from the stocks/{symbol} where the symbol is parsed as an argument.

Returns: JSON object of either an error or successful data.
*/

function fetchSymbols(symbol) {
    let url = `http://131.181.190.87:3000/stocks/${symbol}`;
    let statusNum;

    return fetch(url)
  .then((res) => { 
    statusNum = res.status;
    return res.json()})
  .then((res) => {
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
Parameter: filter= the filter paramter which is set by the selector

Returns the JSON data from the stocks/symbols/ or /stocks/symbols?industry=(filter) where the filter is parsed as an argument.

Returns: JSON object of either an error or successful data.
*/

function fetchStocks(filter) {
  let filtered = filter;
  let statusNum;

  filtered = filtered.toString().replace(' ', '%20')
  let url = `http://131.181.190.87:3000/stocks/symbols`;

  if(filter !== "<Empty>"){
    url = `http://131.181.190.87:3000/stocks/symbols?industry=${filtered}`;
  }

    return fetch(url)
  .then((res) => {statusNum = res.status; return res.json()})
  .then((res) => {
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
Parameter: None

Returns Ag-grid components that display stocks for both specific Industries Symbols or all Industries.

Returns: Displays the Ag-grid for stocks.
*/

export const Stock = function() {
  const [filter, setfilter]= useState("<Empty>");//Set usestates
  const [symbol, setsymbol] = useState("");
  const [error, seterror] = useState("");
  const [error2, seterror2] = useState("");
  const [truth, settruth] = useState(true);

  let [Stock, setStock] = useState([]);
    useEffect(() => {
      fetchStocks(filter)
    .then((Industry) => {
      if(Industry.error === true){//If response is error
        seterror(`Status: ${Industry.status}--Error: ${Industry.message}`);
      }
      else{//Else if response is successful
        seterror(``);
        setStock(Industry);
      }
    })  
  }, [filter]);

  let [SymbolStock, setSymbolStock] = useState([{}]);
    useEffect(() => {
      fetchSymbols(symbol)
    .then((link) => {
      if(link.error === true){//if response is error
        if(truth){//truth value is true
          if(link.status === 444){
            seterror2(`Status: ${link.status}--Error: ${link.message}`);
          }
          else{
            settruth(false);
          }
        }
        else{
          seterror2(`Status: ${link.status}--Error: ${link.message}`);
          setSymbolStock(Notfound);
        }
      }
      else
      {//Else If response successful
        seterror2(``);
        let arr = [link];
        setSymbolStock(arr);
      }
    }) 
     // eslint-disable-next-line
  }, [symbol]);
  return (
    <div style={{background: "linear-gradient(to bottom, #FFFFFF -1%, #537895 100%)", paddingBottom: "13vh"}}>
      <br></br>
      <div className="ag-theme-balham" style={{height: "400px", width: "80%", margin: "auto"}}>
      <h2 style={{textAlign: "left"}}>Stock Industry<span style={{fontSize: "13px", textAlign: "right"}}>{error}</span></h2>
              <Select style={{display: "flex"}} options={techCompanies} defaultValue={techCompanies[0]} onChange={e => {
                setfilter(e.label);
              }}/>
              <AgGridReact columnDefs={Columns} rowData={Stock}  pagination={true} enableColResize={true} onGridReady={function(params){
                let gridApi = params.api;
                gridApi.sizeColumnsToFit();
              }}/>
              <br></br>
        </div>
        <div className="ag-theme-balham" style={{height: "400px", width: "80%", margin: "auto", marginTop: "14vh"}}>
          <form style={{height: "400px", width: "100%", margin: "auto", marginTop: "14vh"}}>
            <h2 style={{textAlign: "left"}}>Stock Symbol<span style={{fontSize: "13px", textAlign: "right"}}>{error2}</span></h2>
            <SearchBar onSubmit={setsymbol} />
            <Chart
              style={{float:"left", padding: "0px", margin: "0px", width: "100%", height: "350px"}}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                [`Volumes: ${SymbolStock[0].volumes}`, 'Open', 'High', 'Low', 'Close'],
                [`${SymbolStock[0].timestamp}`, SymbolStock[0].open, SymbolStock[0].high, SymbolStock[0].low, SymbolStock[0].close],
              ]}
              
              options={{
                chart: {
                  title: `${SymbolStock[0].name}`,
                  subtitle: `${SymbolStock[0].industry}`,
                },
              }}/>
          </form>
        </div>
      </div>
  );
}
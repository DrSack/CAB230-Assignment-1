import React, {useState,useEffect} from "react";
import Select from "react-select";

import {AgGridReact} from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const techCompanies = [
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

const Columns = [
  { headerName: "Name", field: "name"},
  { headerName: "Symbol", field: "symbol"},
  { headerName: "Industry", field: "industry"},
];

const Columns2 = [
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

function handleErrors(response) {
  if (!response.ok) {
      return false;
  }
  return response;
}

function fetchSymbols(symbol) {
    let url = `http://131.181.190.87:3000/stocks/${symbol}`;
    return fetch(url).then(handleErrors)
  .then((res) => res.json()).catch(error => ({
    timestamp: "Not Found",
    symbol: "Not Found",
    name: "Not Found",
    industry: "Not Found",
    open: "Not Found",
    high: "Not Found",
    low: "Not Found",
    close: "Not Found",
    volumes: "Not Found",
  }))
  .then((res) => res)
}


function fetchStocks(filter) {
  let filtered = filter;
  filtered = filtered.toString().replace(' ', '%20')

  let url = `http://131.181.190.87:3000/stocks/symbols`;

  if(filter !== "<Empty>"){
    url = `http://131.181.190.87:3000/stocks/symbols?industry=${filtered}`;
  }

    return fetch(url)
  .then((res) => res.json())
  .then((res) => res)
  
}


export const Stock = function() {
  const [filter, setfilter]= useState("<Empty>");
  const [symbol, setsymbol] = useState("");

  let [Stock, setStock] = useState([]);
    useEffect(() => {
      fetchStocks(filter)
    .then((User) => {
    setStock(User);
    })  
  }, [filter]);

  let [SymbolStock, setSymbolStock] = useState([{}]);
    useEffect(() => {
      fetchSymbols(symbol)
    .then((link) => {
      let arr = [link];
      setSymbolStock(arr);
    })  
  }, [symbol]);


  return (
    <div style={{background: "linear-gradient(to bottom, #FFFFFF -1%, #537895 100%)", paddingBottom: "13vh"}}>
      <br></br>
      <div className="ag-theme-balham" style={{height: "400px", width: "80%", margin: "auto"}}>
      <h2 style={{textAlign: "left"}}>Stock Industry</h2>
              <Select style={{display: "flex"}} options={techCompanies} defaultValue={techCompanies[0]} onChange={e => {
                setfilter(e.label);
              }}/>
              <AgGridReact columnDefs={Columns} rowData={Stock} pagination={true} suppressHorizontalScroll={true} onGridReady={function(params){
                let gridApi = params.api;
                gridApi.sizeColumnsToFit();
              }}/>
              <br></br>
        </div>
        <div className="ag-theme-balham" style={{height: "400px", width: "80%", margin: "auto", marginTop: "14vh"}}>
          <form style={{height: "400px", width: "100%", margin: "auto", marginTop: "14vh"}}>
            <h2 style={{textAlign: "left"}}>Stock Symbol</h2>
            <SearchBar onSubmit={setsymbol} />
            <AgGridReact columnDefs={Columns2} rowData={SymbolStock} pagination={true} onGridReady={function(params){
                let gridApi = params.api;
                gridApi.sizeColumnsToFit();
              }}/>
          </form>
        </div>
      </div>
  );
}
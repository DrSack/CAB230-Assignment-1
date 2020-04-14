import React, {useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import "bootstrap/dist/css/bootstrap.min.css"
//import {Button, Badge} from "reactstrap";

export const Table = function(){
    const [rowData, setRowData] = useState([])
    const Columns = [
            { headerName: "Title", field: "title"},
            { headerName: "Author", field: "author"},
            { headerName: "Edition Count", field: "editionCount"},
            { headerName: "Book ID", field: "id"}
        ];

        useEffect(() => {
            fetch("https://openlibrary.org/subjects/drama.json?published_in=2000")
            .then(res => res.json())
            .then(data => data.works)
            .then(works => 
                works.map(book => {
                    return{
                        title : book.title,
                        author: book.authors[0].name,
                        editionCount: book.edition_count,
                        id: book.cover_id
                    };
                    }
                )
                )
                .then(books => setRowData(books))
                
        })
    return(
    <div>
        <h1 style={{textAlign: "center"}}>Authors</h1>
        <div className="ag-theme-balham" style={{height: "500px", width: "80%", margin: "auto"}}>
                <AgGridReact columnDefs={Columns} rowData={rowData} pagination={true} paginationPageSize={7}/>
        </div>
      </div>
    )
  }
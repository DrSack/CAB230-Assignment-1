import React, {useState} from "react";
import axios from 'axios';

export const UploadFile = function(){//upload a file example

    const url = "https://127.0.0.2:8000/excel"
    const [file, setFile]  = useState();
  
    function Upload(){
      console.log(file);
      const data = new FormData() 
      data.append('file', file)
      axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
          console.log(res.statusText)
      });
    }
  
    function onChange(e)
    {
      let files = e.target.files;
  
      if(e.target.value.length <= 0){
        return;
      }
  
      else if(!files[0].name.match(/.(csv|xlsx)$/i)){
        alert('Must be CSV or XLSX');
        e.target.value = null;
      }
  
      else{
        setFile(files[0]);
      }
    }
  
    return(
      <div><br/>
        <input style={{display: "inline-block"}} type="file" name="file" accept=".csv, .xls" onChange={(e) => onChange(e)} />
        <button style={{marginLeft: "20px"}} onClick={ () =>Upload()} >Upload</button>
      </div>
    )
  }
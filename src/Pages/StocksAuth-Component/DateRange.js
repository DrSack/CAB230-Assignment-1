import React, {useState} from "react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';



export const DateRange = function(props){
    const [date, setdate] = useState(null);

    return (
        <div style={{width: "100%"}}>
            <div style={{float: "right"}}>
          <DateRangePicker style={{width: "100%"}} onChange={e => { setdate(e); return props.onDate(e)}} value={date}/>
          </div>
        </div>
      );
}
import React, {useState} from "react";//import dependencies
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

/*
Parameter: props=onDate to pass date value to StocksAuth.

Display DateRangePicker and send onDate props to StocksAuth.

Returns: Datepicker component.
*/

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
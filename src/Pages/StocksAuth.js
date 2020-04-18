import React from "react";
import {StocksAuth} from "./StocksAuth-Component/StocksAuth"

/*
Parameter: props= pass down props.token.

Display the StocksAuth component and pass through props.token

Returns: StocksAuth component.
*/

export const StocksAuthed = function(props) {
return(
    <div>
      <StocksAuth token={props.token}/>
    </div>
  )
}
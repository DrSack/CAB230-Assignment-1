import React from "react";
import {StocksAuth} from "./StocksAuth-Component/StocksAuth"

export const StocksAuthed = function(props) {
return(
    <div>
      <StocksAuth token={props.token}/>
    </div>
  )
}
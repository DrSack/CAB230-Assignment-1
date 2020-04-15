import React from "react";
import {Table} from "./StocksAuth-Component/Tables"

export const Spaces = function(props) {
return(
    <div>
      <Table token={props.token}/>
    </div>
  )
}
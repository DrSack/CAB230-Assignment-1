import React from "react";//import dependencies
import {Welcome} from './Home-Component/Welcome';

/*
Parameter: props= onSubmits being set.

Display the Welcome component and parse through its properties

Returns: Welcome component.
*/

export const Home = function(props) {
  return(
    <div>
      <Welcome onSubmit={e => props.onSubmit(e)} onSubmit2={e => props.onSubmit2(e)} onSubmit3={e => props.onSubmit3(e)}/>
    </div>
  )
}
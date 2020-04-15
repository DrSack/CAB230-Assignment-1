import React from "react";
import {Welcome} from './Home-Component/Welcome';

export const Home = function(props) {
  return(
    <div>
      <Welcome onSubmit={e => props.onSubmit(e)} onSubmit2={e => props.onSubmit2(e)} onSubmit3={e => props.onSubmit3(e)}/>
    </div>
  )
}
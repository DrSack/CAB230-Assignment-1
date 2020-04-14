import React from "react";
import * as style from '../../Styling/Styling';

export const Stages = function(props){
    return(
      <div>
        <h2>Cool beans</h2>
        <div style={style.middleBoom1}>
          <h2>{props.H1}</h2>
          <p>cool stuff is writen over here lmao</p>
        </div>
        <div style={style.middleBoom2}> 
          <h2>{props.H2}</h2>
          <p>cool stuff is writen over here lmao</p>
        </div>
        <div style={style.middleBoom3}>
          <h2>{props.H3}</h2>
          <p>cool stuff is writen over here lmao</p>
        </div>
      </div>
    )
}
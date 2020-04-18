
import React from "react";//Import depen
import { Router, Switch, Route } from "react-router-dom";

import {Home} from "../Home";// import components
import {Stocks} from "../Stocks";
import {StocksAuthed} from "../StocksAuth";

import history from './History';//import history 

/*
  Parameters: props= set OnSubmit props to send data towards LoginRegister and pass down token prop.

  Switch route paths to different page components and pass down token towards StocksAuthed.

  Return: The Different routes of page compoents.
*/

export const RoutingComponent = function(props){
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact render={(prop) => <Home 
                    {...prop} 
                    onSubmit={e => props.onSubmit(e)} 
                    onSubmit2={e => props.onSubmit2(e)} 
                    onSubmit3={e => props.onSubmit3(e)}/>} />
                    <Route path="/StocksAuthed" render={(prop) => <StocksAuthed {...prop} token={props.token}/>}/>
                    <Route path="/Stocks" component={Stocks} />
                </Switch>
            </Router>
        )
}
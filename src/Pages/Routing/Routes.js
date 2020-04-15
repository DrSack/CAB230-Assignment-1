
import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import {Home} from "../Home";
import {Stocks} from "../Stocks";
import {Spaces} from "../Spaces";

import history from './History';

export const RoutingComponent = function(props){
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact render={(prop) => <Home 
                    {...prop} 
                    onSubmit={e => props.onSubmit(e)} 
                    onSubmit2={e => props.onSubmit2(e)} 
                    onSubmit3={e => props.onSubmit3(e)}/>} />
                    <Route path="/Spaces" render={(prop) => <Spaces {...prop} token={props.token}/>}/>
                    <Route path="/Stocks" component={Stocks} />
                </Switch>
            </Router>
        )
}
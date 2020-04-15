
import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import {Home} from "../Home";
import {Stocks} from "../Stocks";
import {Contact} from "../Contact";
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
                    <Route path="/Stocks" component={Stocks} />
                    <Route path="/Contact" exact component={Contact} />
                    <Route path="/Spaces" component={Spaces}/>
                </Switch>
            </Router>
        )
}
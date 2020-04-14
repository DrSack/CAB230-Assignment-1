
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import {Home} from "../Home";
import {Stocks} from "../Stocks";
import {Contact} from "../Contact";
import {Spaces} from "../Spaces";

import history from './History';

export default class Routes extends Component {// Call Routes and swap between pages if called.
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Stocks" component={Stocks} />
                    <Route path="/Contact" exact component={Contact} />
                    <Route path="/Spaces" component={Spaces}/>
                </Switch>
            </Router>
        )
    }
}
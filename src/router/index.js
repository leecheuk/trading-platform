import React from "react";
import {Switch, Route} from "react-router-dom";
// Views
import Home from '../views/Home';
import Settings from '../views/Settings';
import History from '../views/History';
import Transaction from '../views/Transaction';

const routes = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/history" component={History} />
        <Route exact path="/transaction/:symbol" component={Transaction} />
    </Switch>
);

export {routes};
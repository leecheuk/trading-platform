import React from "react";
import {Switch, Route} from "react-router-dom";
// Views
import Home from '../views/Home';
import Settings from '../views/Settings';

const routes = (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/settings" component={Settings} />
            </Switch>
    );

export {routes};
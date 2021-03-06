import React from 'react';
import ReactDOM from 'react-dom';
// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'bootstrap';
// app
import App from './App';
import * as serviceWorker from './serviceWorker';
// router
import {MemoryRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Router initialEntries={["/"]}>
        <App />
    </Router>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

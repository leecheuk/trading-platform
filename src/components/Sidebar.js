import React from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

function Sidebar() {
    const history = useHistory();
    const path = history.location.pathname;
    return (
        <ul className="side-bar">
            <li className={path === "/" ? "active" : null}><Link to="/">Home</Link></li>
            <li className={path === "/history" ? "active" : null}><Link to="/history">History</Link></li>
            <li className={path === "/settings" ? "active" : null}><Link to="/settings">Settings</Link></li>
        </ul>
    )
}

export default Sidebar;
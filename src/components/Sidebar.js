import React from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

function Sidebar() {
    const history = useHistory();
    const path = history.location.pathname;
    return (
        <ul className="side-bar">
            <li><Link to="/" className={path == "/" ? "active" : null}>Home</Link></li>
            <li><Link to="/history" className={path == "/history" ? "active" : null}>History</Link></li>
            <li><Link to="/settings" className={path == "/settings" ? "active" : null}>Settings</Link></li>
        </ul>
    )
}

export default Sidebar;
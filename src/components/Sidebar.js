import React from "react";
import {Link} from "react-router-dom";

function Sidebar() {
    return (
        <ul className="side-bar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/settings">Settings</Link></li>
        </ul>
    )
}

export default Sidebar;
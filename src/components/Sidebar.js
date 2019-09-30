import React from "react";
import {Link} from "react-router-dom";

function Sidebar() {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/settings">Settings</Link></li>
        </ul>
    )
}

export default Sidebar;
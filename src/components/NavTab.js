import React from "react";

function NavTab(props) {
    return (
        <div className="nav-tab">
            <div className={props.tab === "portfoliolist" ? "tab active" : "tab"} 
                onClick={props.onClickTab.bind(null, "portfoliolist")}>Portfolio</div>
            <div className={props.tab === "watchlist" ? "tab active" : "tab"} 
                onClick={props.onClickTab.bind(null, "watchlist")}>Watch List</div>
        </div>
    );
}

export default NavTab;
import React from "react";

function Layout(props) {
    return (
        <div className="layout-main">
            {props.children}
        </div>
    )
}

export default Layout;
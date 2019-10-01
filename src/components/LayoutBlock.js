import React from "react";

function LayoutBlock(props) {
    return (
        <div className="layout-block">
            {props.children}
        </div>
    )
}

export default LayoutBlock;
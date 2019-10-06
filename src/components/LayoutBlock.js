import React from "react";

function LayoutBlock(props) {
    const table = props.table ? " table-block" : "";
    return (
        <div className={"layout-block" + table}>
            {props.children}
        </div>
    )
}

export default LayoutBlock;
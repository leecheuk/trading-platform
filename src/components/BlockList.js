import React from "react";

function BlockList(props) {
    return (
        <ul className="block-list">
            {props.children}
        </ul>
    );
}

export default BlockList;
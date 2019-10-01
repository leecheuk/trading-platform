import React, {useState} from "react";

function BlockListItem(props) {
    const [showMinor, setMinor] = useState(false);

    function onClickItem() {
        setMinor(!showMinor);
    }
    return (
        <li className="block-list-item">
            <div className="main">
                <div className="block-left">
                    <div className="title">{props.title}</div>
                    <div className="subtitle">{props.subtitle}</div>
                </div>
                <div className="block-right">
                    <i className={`fas fa-angle-${showMinor ? "down" : "right"} fa-lg`} onClick={onClickItem}></i>
                </div>
            </div>
            <div className="minor">
                {props.minor}
            </div>
        </li>
    );
}

export default BlockListItem;
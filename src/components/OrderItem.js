import React from "react";

function HistoryItem(props) {
    const { date, type, symbol, price, quantity } = props.data;
    return (
        <tr>
            <td>{date.split(" ")[0]}</td>
            <td>{type}</td>
            <td>{symbol}</td>
            <td>{price}</td>
            <td>{quantity}</td>
            <td>{(props.quote - price) * 100 / price}%</td>
        </tr>
    )
}

export default HistoryItem;
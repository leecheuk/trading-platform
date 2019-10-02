import React from "react";

function HistoryTable() {
    const date = '2019-08-12', 
        stock = 'Apple Inc. (AAPL)',
        price = '100',
        quantity = '4',
        gain = '-';
    return (
        <table className="table table-hover table-condensed history-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Gain (Loss)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{date}</td>
                    <td>{stock}</td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                    <td>{gain}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default HistoryTable;
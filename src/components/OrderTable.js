import React from "react";

function HistoryTable(props) {
    return (
        <div className="block-container">
            <table className="table table-hover table-condensed history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Gain (Loss)</th>
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryTable;
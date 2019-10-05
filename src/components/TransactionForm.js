import React from "react";

function TransactionForm(props) {
    const {price, quantity, symbol, name} = props;
    const subtotal = price*quantity;
    const total = subtotal + 7;
    const stockName = `${name} (${symbol})`;
    return (
        <table className="table table-hover table-condensed transaction-table">
            <thead>
                <tr>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{stockName}</td>
                    <td>{price}</td>
                    <td style={{ width: '200px' }}>
                        <input className="form-control" type="number"
                            onChange={props.onChangeQuantity} 
                            value={props.quantity}/>
                    </td>
                    <td>{subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Transaction Fee</td>
                    <td>7.00</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Total</td>
                    <td>{total.toFixed(2)}</td>
                </tr>
            </tbody>

        </table>
    )
}

export default TransactionForm;
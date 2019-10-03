import React, { useState, useEffect } from "react";
import alpha from "../api/alpha";
import quotes from "../seed/quote.json";
// components
import TransactionForm from "../components/TransactionForm";
import CheckoutBtns from "../components/CheckoutBtns";

function Transaction(props) {
    const [data, setData] = useState([]);
    const symbol = props.symbol;
    useEffect(() => {
        const fetchData = async () => {
            const url = alpha.getQuoteURL(symbol);
            const data = await alpha.getData(url);
            setData(data["Global Quote"]);
        }
        if (process.env.NODE_ENV !== "development") {
            fetchData();
        } else {
            setData(quotes["Global Quote"]);
        }
    });
    const [quantity, setQuantity] = useState(1);
    function onChangeQuantity(e) {
        setQuantity(e.target.value);
    }
    function onClickCancel() {
        props.history.push('/');
    }
    function onClickSubmit() {
        props.history.push('/');
    }
    return (
            <>
                <TransactionForm 
                    price={100}
                    symbol={"AAPL"}
                    name={"Apple Inc"}
                    quantity={quantity} 
                    onChangeQuantity={onChangeQuantity}/>
                <CheckoutBtns onClickCancel={onClickCancel} onClickSubmit={onClickSubmit} />
            </>
    )
}

export default Transaction;
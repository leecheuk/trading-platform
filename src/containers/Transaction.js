import React, { useState, useEffect } from "react";
import alpha from "../api/alpha";
import db from "../api/db";
// components
import TransactionForm from "../components/TransactionForm";
import CheckoutBtns from "../components/CheckoutBtns";

function Transaction(props) {
    // quote data
    const [data, setData] = useState({price: "NA"});
    const symbol = props.symbol;
    useEffect(() => {
        let isSubscribed = true;
        const fetchData = async () => {
            const url = alpha.getQuoteURL(symbol);
            const stock = await alpha.getData(url);
            if (isSubscribed) {
                setData(alpha.sanitizeQuote(stock));
            }
        }
        fetchData();
        return () => {
            isSubscribed = false;
        }
    }, []);

    // stock info 
    const [stock, setStock] = useState({name: "NA"});
    useEffect(() => {
        let isSubscribed = true;
        const fetchData = async () => {
            const url = alpha.getSearchURL(symbol);
            const stock = await alpha.getData(url);
            if (isSubscribed) {
                console.log(stock);
                setStock(alpha.sanitizeSearch(stock)[0]);
            }
        }
        fetchData();
        return () => {
            isSubscribed = false;
        }
    }, []);

    // user
    const [user, setUser] = useState({});
    useEffect(() => {
        let isSubscribed = true;
        db.getUser((u) => {
            setUser(u);
            console.log(u);
        });

        return () => {
            isSubscribed = false;
        }
    }, []);

    // quantity
    const [quantity, setQuantity] = useState(1);
    function onChangeQuantity(e) {
        // limit quantity size
        if (props.type == "Sell" && quantity <= user.holdingQuantity) {
            setQuantity(e.target.value);
        } else if (props.type == "Purchase" && user.balance >= data.price * e.target.value + 7) {
            setQuantity(e.target.value);
        }
    }
    function onClickCancel() {
        props.history.push('/');
    }
    function onClickSubmit() {
        const s = {
            name: stock.name,
            symbol: stock.symbol,
            quantity,
            type: props.type.toLowerCase(),
            price: data.price,
            transaction_fee: stock.transaction_fee || 7
        }
        
        db.order(s);
        props.history.push('/');
    }
    return (
            <>
                <TransactionForm 
                    price={data.price}
                    symbol={data.symbol}
                    name={stock.name}
                    quantity={quantity} 
                    onChangeQuantity={onChangeQuantity}/>
                <CheckoutBtns onClickCancel={onClickCancel} onClickSubmit={onClickSubmit} />
            </>
    )
}

export default Transaction;
import React, { useState, useEffect } from "react";
import alpha from "../api/alpha";
import db from "../api/db";
// components
import TransactionForm from "../components/TransactionForm";
import CheckoutBtns from "../components/CheckoutBtns";

function Transaction(props) {
    const params = new URLSearchParams(props.history.location.search);
    const portfolio_id = params.get('portfolio_id');
    // quote data
    const [data, setData] = useState({price: "NA"});
    const symbol = props.match.params.symbol;
    useEffect(() => {
        let isSubscribed = true;
        const fetchData = () => {
            alpha.getQuoteURL(symbol, (url) => {
                alpha.getData(url).then((stock) => {
                    if (isSubscribed) {
                        setData(alpha.sanitizeQuote(stock));
                    }
                });
            });
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
        const fetchData = () => {
            alpha.getSearchURL(symbol, (url) => {
                alpha.getData(url).then((stock) => {
                    if (isSubscribed) {
                        stock = alpha.sanitizeSearch(stock).length > 0 ? alpha.sanitizeSearch(stock)[0] : {name: "NA"}
                        setStock(stock);
                    }
                });
            });
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
            if (isSubscribed) {
                setUser(u);
            }
        });

        return () => {
            isSubscribed = false;
            db.removeUserListener();
        }
    }, []);
    // get stock info from portfolio for selling
    const [portfolioStock, setPortfolioStock] = useState({});
    useEffect(() => {
        let isSubscribed = true;
        db.getPortfolioStock(portfolio_id, (u) => {
            if (isSubscribed) {
                setPortfolioStock(u);
            }
        });

        return () => {
            isSubscribed = false;
            db.removePortfolioStockListener();
        }
    }, []);

    // quantity
    const [quantity, setQuantity] = useState(1);
    function onChangeQuantity(e) {
        // limit quantity size
        if (props.type == "Sell" && e.target.value <= portfolioStock.quantity) {
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
            symbol: symbol,
            quantity,
            type: props.type.toLowerCase(),
            price: data.price,
            transaction_fee: 7,
            portfolio_id
        }
        
        db.order(s, () => {
            props.history.push('/');
        });
    }
    const isOverbudget = data.price + 7 > user.balance;
    return (
            <>
                <TransactionForm 
                    price={data.price}
                    symbol={symbol}
                    name={stock.name}
                    quantity={quantity} 
                    onChangeQuantity={onChangeQuantity}/>
                <CheckoutBtns onClickCancel={onClickCancel} onClickSubmit={onClickSubmit} 
                    disabled={isOverbudget || stock.name === "NA" || data.price === "NA"}/>
            </>
    )
}

export default Transaction;
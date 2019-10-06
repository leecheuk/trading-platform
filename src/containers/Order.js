import React, {useState, useEffect} from "react";
import OrderItem from "../components/OrderItem";
import alpha from "../api/alpha";

function Order(props) {
    const [quote, setQuote] = useState({});
    useEffect(() => {
        let isSubscribed = true;
        const fetchData = () => {
            alpha.getQuoteURL(props.data.symbol, (url) => {
                alpha.getData(url).then((q) => {
                    if (isSubscribed) {
                        setQuote(alpha.sanitizeQuote(q).price);
                    }
                });
            });
        }
        fetchData();
        return () => {
            isSubscribed = false;
        }
    }, []);
    return (
        <OrderItem data={props.data} quote={quote}/>
    )
}

export default Order;
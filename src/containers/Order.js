import React, {useState, useEffect} from "react";
import OrderItem from "../components/OrderItem";
import alpha from "../api/alpha";

function Order(props) {
    const [quote, setQuote] = useState({});
    useEffect(() => {
        let isSubscribed = true;
        const fetchData = async () => {
            const url = alpha.getQuoteURL(props.data.symbol);
            const q = await alpha.getData(url);
            if (isSubscribed) {
                setQuote(alpha.sanitizeQuote(q).price);
            }
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
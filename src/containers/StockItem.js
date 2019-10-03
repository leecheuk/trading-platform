import React, {useState, useEffect} from "react";
import BlockListItem from "../components/BlockListItem";
import alpha from "../api/alpha";
import quotes from "../seed/quote.json";


function StockItem(props) {
    const { stock, i } = props;
    const [data, setData] = useState([]);
    const symbol = stock["1. symbol"];
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

    return (
        <>
            <BlockListItem 
                key={i} 
                quote={data["05. price"]}
                title={`${stock["2. name"]} (${symbol})`}
                symbol={symbol}
                onClickSell={props.onClickSell} 
                type={"portfoliolist"} />
        </>
    );
}

export default StockItem;
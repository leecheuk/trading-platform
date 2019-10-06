import React, {useState, useEffect} from "react";
import BlockListItem from "../components/BlockListItem";
import alpha from "../api/alpha";
import BlockList from "../components/BlockList";

function StockItem(props) {
    const { stock, i } = props;
    const [data, setData] = useState([]);
    const symbol = stock.symbol;
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

    return (
        <>
            <BlockListItem 
                {...props}
                symbol={stock.symbol}
                favourite={stock.isFavourite}
                quote={data.price}/>
        </>
    );
}

export default StockItem;
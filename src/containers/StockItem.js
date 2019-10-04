import React, {useState, useEffect} from "react";
import BlockListItem from "../components/BlockListItem";
import alpha from "../api/alpha";
import BlockList from "../components/BlockList";

function StockItem(props) {
    const { stock, i } = props;
    const [data, setData] = useState([]);
    const symbol = stock.symbol;
    useEffect(() => {
        const fetchData = async () => {
            const url = alpha.getQuoteURL(symbol);
            const data = await alpha.getData(url);
            setData(alpha.sanitizeQuote(data));
        }
        fetchData();
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
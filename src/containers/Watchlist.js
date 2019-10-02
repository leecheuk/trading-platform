import React, {useEffect, useState} from "react";
import alpha from "../api/alpha";
import Search from "../components/Search";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";
import search_results from "../seed/search.json";

function Watchlist(props) {
    const [query, setQuery] = useState("");
    const onChangeQuery = (e) => {
        setQuery(e.target.value);
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const url = alpha.getSearchURL(query);
            const stocks = await alpha.getData(url);
            setData(stocks.bestMatches);
        }
        if (query != "" && process.env.NODE_ENV !== "development") {
            fetchData();
        } else {
            setData(search_results.bestMatches);
        }
    }, [query]);

    return (
        <>
            <Search query={query} onChangeQuery={onChangeQuery}/>
            <BlockList>
                {data.length > 0 ? data.map((stock, i) => 
                    <BlockListItem key={i} title={`${stock["2. name"]} (${stock["1. symbol"]})`} />    
                ) : null}
            </BlockList>
        </>
    );
}

export default Watchlist;
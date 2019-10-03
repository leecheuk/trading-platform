import React, { useEffect, useState } from "react";
import alpha from "../api/alpha";
import Search from "../components/Search";
import SearchList from "../components/SearchList";
import PortfolioList from "../components/PortfolioList";

// dummy data
import search_results from "../seed/search.json";

function Dashboard(props) {
    const [query, setQuery] = useState("");
    const onChangeQuery = (e) => {
        setQuery(e.target.value);
    };
    const onClickItem = (symbol) => {
        props.history.push(`/transaction/${symbol}?type=Purchase`);
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const url = alpha.getSearchURL(query);
            const stocks = await alpha.getData(url);
            setData(stocks.bestMatches);
        }
        if (query !== "" && process.env.NODE_ENV !== "development") {
            fetchData();
        } else {
            setData(search_results.bestMatches);
        }
    }, [query]);

    const onClickSell = (symbol) => {
        props.history.push(`/transaction/${symbol}?type=Sell`);
    }

    const isDev = (process.env.NODE_ENV === "development");
    const portfolio = isDev ? search_results.bestMatches : data;

    return (
        <>
            <Search query={query} onChangeQuery={onChangeQuery} />
            {query !== "" ? <SearchList data={data} onClickItem={onClickItem} /> : null}
            {query !== "" ? null : <PortfolioList data={portfolio} onClickSell={onClickSell} />}
        </>
    );
}

export default Dashboard;
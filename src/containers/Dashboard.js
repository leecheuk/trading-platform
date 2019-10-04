import React, { useEffect, useState } from "react";
import alpha from "../api/alpha";
import Search from "../components/Search";
import SearchList from "../components/SearchList";
import PortfolioList from "../components/PortfolioList";
import WatchList from "../components/WatchList";
import NavTab from "../components/NavTab";
import db from "../api/db";

// dummy data
import search_results from "../seed/search.json";

function Dashboard(props) {
    // tab
    const [tab, setTab] = useState("portfoliolist");
    const onClickTab = (tab) => {
        setTab(tab);
    }
    // query
    const [query, setQuery] = useState("");
    const onChangeQuery = (e) => {
        setQuery(e.target.value);
    };
    const onClickItem = (symbol) => {
        props.history.push(`/transaction/${symbol}?type=Purchase`);
    };
    const onClickCancel = () => {
        setQuery("");
    }
    // data
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const url = alpha.getSearchURL(query);
            const stocks = await alpha.getData(url);
            setData(alpha.sanitizeSearch(stocks));
        }
        fetchData();
    }, [query]);

    // favourite
    const [favs, setFavs] = useState([]);
    const onClickFavourite = (args) => {
        var stock = {
            ...args,
            isFavourite: !args.isFavourite
        }
        db.favouriteStock(stock, (row) => {
            setFavs(row);
        });
    }
    useEffect(() => {
        db.getFavourites((row) => {
            setFavs(row);
        });
        return () => {
            db.removeFavouriteListener();
        }
    }, []);

    // sell
    const onClickSell = (symbol) => {
        props.history.push(`/transaction/${symbol}?type=Sell`);
    }

    function renderList() {
        if (query === "") {
            switch (tab) {
                case "portfoliolist":
                    return (
                        <PortfolioList data={data} onClickSell={onClickSell} />
                    );
                case "watchlist":
                    return (
                        <WatchList 
                            onClickFavourite={onClickFavourite}
                            data={favs} 
                            onClickItem={onClickItem} />
                    );
            }
        }
    }

    return (
        <>
            <Search query={query} onChangeQuery={onChangeQuery} />
            {query !== "" ? null : <NavTab tab={tab} onClickTab={onClickTab}/>}
            {query !== "" ?
                    <> 
                        <SearchList 
                                favs={favs}
                                data={data} 
                                onClickItem={onClickItem} 
                                onClickFavourite={onClickFavourite} />
                        <div className="cancel-container">
                            <i className="fas fa-times-circle fa-lg" onClick={onClickCancel}></i>
                        </div>
                    </>
                    : null}
            {renderList()}
        </>
    );
}

export default Dashboard;
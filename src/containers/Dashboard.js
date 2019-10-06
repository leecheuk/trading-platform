import React, { useEffect, useState } from "react";
import alpha from "../api/alpha";
import Search from "../components/Search";
import SearchList from "../components/SearchList";
import PortfolioList from "../components/PortfolioList";
import WatchList from "../components/WatchList";
import NavTab from "../components/NavTab";
import db from "../api/db";


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
    // search data
    const [data, setData] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        const fetchData = () => {
            alpha.getSearchURL(query, (url) => {
                alpha.getData(url).then((stocks) => {
                    if (isSubscribed) {
                        setData(alpha.sanitizeSearch(stocks));
                    }
                });
            });
        }
        fetchData();
        return () => {
            isSubscribed = false
        }
    }, [query]);

    // favourite
    const [favs, setFavs] = useState([]);
    const onClickFavourite = (args) => {
        let isSubscribed = true;
        var stock = {
            ...args,
            isFavourite: !args.isFavourite
        }
        db.favouriteStock(stock, (row) => {
            if (isSubscribed) {
                setFavs(row);
            }
        });
    }
    useEffect(() => {
        let isSubscribed = true;
        db.getFavourites((row) => {
            if (isSubscribed) {
                setFavs(row);
            }
        });
        return () => {
            isSubscribed = false;
            db.removeFavouriteListener();
        }
    }, []);

    // portfolio
    const [portfolio, setPortfolio] = useState([]);
    useEffect(() => {
        let isSubscribed = true;
        db.getPortfolio((row) => {
            if (isSubscribed) {
                setPortfolio(row);
            }
        });
        return () => {
            isSubscribed = false;
            db.removePortfolioListener();
        }
    }, []);


    // sell
    const onClickSell = (symbol, portfolio_id) => {
        props.history.push(`/transaction/${symbol}?type=Sell&portfolio_id=${portfolio_id}`);
    }

    function renderList() {
        if (query === "") {
            switch (tab) {
                case "portfoliolist":
                    return (
                        <PortfolioList data={portfolio} onClickSell={onClickSell} />
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
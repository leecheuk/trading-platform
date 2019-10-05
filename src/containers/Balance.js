import React, {useState, useEffect} from "react";
import db from "../api/db";
import alpha from "../api/alpha";
import BalanceSummary from "../components/BalanceSummary";

function Balance() {
    // user
    const [user, setUser] = useState({});
    useEffect(() => {
        let isSubscribed = true;
        db.getUser((u) => {
            setUser(u);
        });

        return () => {
            isSubscribed = false;
        }
    }, []);

    // portfolio
    // get portfolio of stocks then look up their prices
    const [portfolio, setPortfolio] = useState([]);
    const [portfolioValue, setPortfolioValue] = useState([]);
    useEffect(() => {
        db.getPortfolio((portfolio) => {
            if (portfolio) {
                setPortfolio(portfolio);
                let value = 0;
                setPortfolioValue(0);
                portfolio.forEach(p => {
                    const url = alpha.getQuoteURL(p.symbol);
                    alpha.getData(url, (data) => {
                        data = alpha.sanitizeQuote(data);
                        value += data.price;
                        setPortfolioValue(value);
                    });
                });
            }
        })
    }, []);


    return (
        <>
            <BalanceSummary user={user} portfolioValue={portfolioValue}/>
        </>
    )
}

export default Balance;
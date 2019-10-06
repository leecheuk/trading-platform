import React, { useState, useEffect } from "react";
import db from "../api/db";
import alpha from "../api/alpha";
import BalanceSummary from "../components/BalanceSummary";

function Balance() {
    // user
    const [user, setUser] = useState({});
    useEffect(() => {
        let isSubscribed = true;
        db.getUser((u) => {
            if (isSubscribed) {
                setUser(u);
            }
        });

        return () => {
            isSubscribed = false;
            db.removeUserListener();
        }
    }, []);

    // portfolio
    // get portfolio of stocks then look up their prices
    const [portfolioValue, setPortfolioValue] = useState(0);
    useEffect(() => {
        let isSubscribed = true;
        db.getPortfolio((portfolio) => {
            if (portfolio) {
                let value = 0;
                portfolio.forEach(p => {
                    const url = alpha.getQuoteURL(p.symbol);
                    alpha.getData(url).then((data) => {
                        data = alpha.sanitizeQuote(data);
                        value += data.price * p.quantity;
                        if (isSubscribed) {
                            setPortfolioValue(value);
                        }
                    });
                });
            }
        });

        return () => {
            isSubscribed = false;
            db.removePortfolioListener();
        }
    }, []);


    return (
        <>
            <BalanceSummary user={user} portfolioValue={portfolioValue} />
        </>
    )
}

export default Balance;
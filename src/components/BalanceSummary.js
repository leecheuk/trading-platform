import React from "react";

function BalanceSummary(props) {
    const cash = props.user.balance;
    const portfolioValue = props.portfolioValue;
    const total = cash + portfolioValue;
    return (
        <div className="balance-summary">
            <div className="total">${parseInt(total).toFixed(2)}</div>
            <div className="cash">${parseInt(cash).toFixed(2)} Cash</div>
            <div className="portfolio">${parseInt(portfolioValue).toFixed(2)} Security</div>
        </div>
    )
}

export default BalanceSummary;
import React from "react";

function BalanceSummary(props) {
    const cash = props.user.balance;
    const portfolioValue = props.portfolioValue;
    const total = cash + portfolioValue;
    return (
        <div className="balance-summary">
            <div className="total">${total}</div>
            <div className="cash">${cash} Cash</div>
            <div className="portfolio">${portfolioValue} Security</div>
        </div>
    )
}

export default BalanceSummary;
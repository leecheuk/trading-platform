import React from "react";

function BalanceSummary() {
    const cash = 5000;
    const portfolio = 5000;
    const total = cash + portfolio;
    return (
        <div className="balance-summary">
            <div className="total">${total}</div>
            <div className="cash">${cash} Cash</div>
            <div className="portfolio">${portfolio} Security</div>
        </div>
    )
}

export default BalanceSummary;
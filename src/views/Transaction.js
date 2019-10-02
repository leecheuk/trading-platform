import React from "react";
// components
import BalanceSummary from "../components/BalanceSummary";
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import Watchlist from "../containers/Watchlist";

function Transaction(props) {
    console.log(props);
    return (
        <Layout>
            <h1 className="title">Purchase</h1>
            <LayoutBlock>

            </LayoutBlock>
        </Layout>
    )
}

export default Transaction;
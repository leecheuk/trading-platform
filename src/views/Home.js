import React from "react";
// components
import BalanceSummary from "../components/BalanceSummary";
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import Watchlist from "../containers/Watchlist";

function Home() {
    return (
        <Layout>
            <BalanceSummary/>
            <LayoutBlock>
                <Watchlist />
            </LayoutBlock>
        </Layout>
    )
}

export default Home;
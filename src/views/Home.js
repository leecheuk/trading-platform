import React from "react";
// components
import BalanceSummary from "../components/BalanceSummary";
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import Watchlist from "../containers/Watchlist";

function Home(props) {
    return (
        <Layout>
            <BalanceSummary/>
            <LayoutBlock>
                <Watchlist history={props.history}/>
            </LayoutBlock>
        </Layout>
    )
}

export default Home;
import React from "react";
// components
import BalanceSummary from "../components/BalanceSummary";
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import Dashboard from "../containers/Dashboard";

function Home(props) {
    return (
        <Layout>
            <BalanceSummary/>
            <LayoutBlock>
                <Dashboard history={props.history}/>
            </LayoutBlock>
        </Layout>
    )
}

export default Home;
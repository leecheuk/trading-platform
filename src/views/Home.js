import React from "react";
// components
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
// containers
import Balance from "../containers/Balance";
import Dashboard from "../containers/Dashboard";

function Home(props) {
    return (
        <Layout>
            <Balance/>
            <LayoutBlock>
                <Dashboard history={props.history}/>
            </LayoutBlock>
        </Layout>
    )
}

export default Home;
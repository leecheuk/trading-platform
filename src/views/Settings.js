import React from "react";
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";

function Settings() {
    return (
        <Layout>
            <h1 className="title">Settings</h1>
            <LayoutBlock>
                <BlockList>
                    <BlockListItem title="IEX API Token" subtitle={`Current token: ${process.env.REACT_APP_API_TOKEN}`}/>
                </BlockList>
            </LayoutBlock>
        </Layout>
    )
}

export default Settings;
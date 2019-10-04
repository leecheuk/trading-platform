import React from "react";
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import Config from "../containers/Config";

function Settings() {
    return (
        <Layout>
            <h1 className="title">Settings</h1>

            <LayoutBlock>
                <Config />
            </LayoutBlock>
        </Layout>
    )
}

export default Settings;
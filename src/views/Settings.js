import React from "react";
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";
import SettingForm from "../components/SettingForm";

function Settings() {
    const API_KEY = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_ALPHA_API_KEY : "None";
    return (
        <Layout>
            <h1 className="title">Settings</h1>
            <LayoutBlock>
                <BlockList>
                    <BlockListItem 
                        title="API Key" 
                        subtitle={`Current key: ${API_KEY}`}
                        minor={SettingForm}
                        />
                </BlockList>
            </LayoutBlock>
        </Layout>
    )
}

export default Settings;
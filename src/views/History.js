import React from "react";
import Layout from "../components/Layout";
import HistoryTable from "../components/HistoryTable";
import LayoutBlock from "../components/LayoutBlock";

function History() {
    return (
        <Layout>
            <h1 className="title">History</h1>
            <LayoutBlock>
                <HistoryTable />
            </LayoutBlock>
        </Layout>
    )
}

export default History;
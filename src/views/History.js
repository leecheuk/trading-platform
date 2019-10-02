import React from "react";
import Layout from "../components/Layout";
import HistoryTable from "../components/HistoryTable";

function History() {
    return (
        <Layout>
            <h1 className="title">History</h1>
            <HistoryTable />
        </Layout>
    )
}

export default History;
import React from "react";
import Layout from "../components/Layout";
import OrderList from "../containers/OrderList";
import LayoutBlock from "../components/LayoutBlock";

function History() {
    return (
        <Layout>
            <h1 className="title">History</h1>
            <LayoutBlock table>
                <OrderList />
            </LayoutBlock>
        </Layout>
    )
}

export default History;
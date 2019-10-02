import React from "react";
// components
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import Transaction from "../containers/Transaction";

function Checkout(props) {
    console.log(props);
    return (
        <Layout>
            <h1 className="title">Purchase</h1>
            <LayoutBlock>
                <Transaction history={props.history}/>
            </LayoutBlock>
        </Layout>
    )
}

export default Checkout;
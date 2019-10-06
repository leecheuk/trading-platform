import React from "react";
// components
import Layout from "../components/Layout";
import LayoutBlock from "../components/LayoutBlock";
import Transaction from "../containers/Transaction";

function Checkout(props) {
    const params = new URLSearchParams(props.location.search);
    return (
        <Layout>
            <h1 className="title">{params.get('type')}</h1>
            <LayoutBlock>
                <Transaction history={props.history} match={props.match} type={params.get('type')}/>
            </LayoutBlock>
        </Layout>
    )
}

export default Checkout;
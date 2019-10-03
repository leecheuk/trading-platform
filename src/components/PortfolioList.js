import React from "react";
import BlockList from "../components/BlockList";
import StockItem from "../containers/StockItem";

function PortfolioList(props) {
    const {data} = props;
    return (
        <BlockList>
            {data.length > 0 ? data.map((stock, i) =>
                <StockItem stock={stock} i={i} key={i} onClickSell={props.onClickSell}/>
            ) : null}
        </BlockList>
    );
}

export default PortfolioList;
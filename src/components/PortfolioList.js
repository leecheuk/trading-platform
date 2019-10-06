import React from "react";
import BlockList from "../components/BlockList";
import StockItem from "../containers/StockItem";
import Placeholder from "../components/Placeholder";

function PortfolioList(props) {
    const {data} = props;
    return (
        <BlockList>
            {data.length > 0 ? data.map((stock, i) =>
                <StockItem
                    key={i}
                    onClickSell={props.onClickSell}
                    stock={stock}
                    type={"portfoliolist"} />
            ) : <Placeholder />}
        </BlockList>
    );
}

export default PortfolioList;
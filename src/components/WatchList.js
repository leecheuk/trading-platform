import React from "react";
import BlockList from "../components/BlockList";
import StockItem from "../containers/StockItem";
import Placeholder from "../components/Placeholder";

function WatchList(props) {
    const {data} = props;
    return (
        <BlockList>
            {data.length > 0 ? data.map((stock, i) => {
                return (

                    <StockItem 
                        key={i}
                        stock={stock}
                        onClickFavourite={props.onClickFavourite.bind(null, stock)}
                        onClickItem={props.onClickItem.bind(stock.symbol)} 
                        type={"watchlist"}/>
                    );
            }) : <Placeholder />}
        </BlockList>
    );
}

export default WatchList;
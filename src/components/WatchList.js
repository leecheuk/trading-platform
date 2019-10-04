import React from "react";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";
import StockItem from "../containers/StockItem";

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
            }) : null}
        </BlockList>
    );
}

export default WatchList;
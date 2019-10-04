import React from "react";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";

function WatchList(props) {
    const {data} = props;
    return (
        <BlockList>
            {data.length > 0 ? data.map((stock, i) => {
                return (
                    <BlockListItem key={i} title={`${stock.name} (${stock.symbol})`}
                        quote={"NA"}
                        favourite={stock.isFavourite}
                        onClickFavourite={props.onClickFavourite.bind(null, stock)}
                        onClickItem={props.onClickItem.bind(stock.symbol)} 
                        type={"watchlist"}/>
                    );
            }) : null}
        </BlockList>
    );
}

export default WatchList;
import React from "react";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";

function WatchList(props) {
    const {data} = props;
    return (
        <BlockList>
            {data.length > 0 ? data.map((stock, i) =>
                <BlockListItem key={i} title={`${stock["2. name"]} (${stock["1. symbol"]})`}
                    quote={122}
                    onClickItem={props.onClickItem.bind(stock["1. symbol"])} type={"watchlist"}/>
            ) : null}
        </BlockList>
    );
}

export default WatchList;
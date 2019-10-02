import React from "react";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";

function SearchList(props) {
    const data = props.data
    return (
        <BlockList>
            {data.length > 0 ? data.map((stock, i) =>
                <BlockListItem key={i} title={`${stock["2. name"]} (${stock["1. symbol"]})`}
                    onClickItem={props.onClickItem.bind(stock["1. symbol"])} />
            ) : null}
        </BlockList>
    );
}

export default SearchList;
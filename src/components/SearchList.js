import React from "react";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";

function SearchList(props) {
    const data = props.data;
    
    return (
        <BlockList>
            {data.length > 0 ? data.map((stock, i) => {
                const s = {
                    name: stock.name,
                    symbol: stock.symbol,
                    isFavourite: false
                }
                const f = props.favs.map(fav => fav.symbol);
                if (f.indexOf(s.symbol) < 0) {
                    return (
                        <BlockListItem key={i} title={`${stock.name} (${stock.symbol})`}
                            onClickItem={props.onClickItem.bind(stock.symbol)}
                            favs={props.favs}
                            onClickFavourite={props.onClickFavourite.bind(null, s)}
                            type={"searchlist"} />
                    )
                } else {
                    return;
                }
            }) : null}
        </BlockList>
    );
}

export default SearchList;
import React, {useEffect, useState} from "react";
import iex from "../api/iex";
import Search from "../components/Search";
import BlockList from "../components/BlockList";
import BlockListItem from "../components/BlockListItem";

function Watchlist(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const stocks = await iex.getAllSymbol();
            setData(stocks);
        }
        fetchData();
    });

    return (
        <>
            <Search data={data}/>
            <BlockList>
                {data.splice(0, 10).map((stock) => 
                    <BlockListItem title={stock.name} />    
                )}
            </BlockList>
        </>
    );
}

export default Watchlist;
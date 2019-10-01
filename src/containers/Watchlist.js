import React, {useEffect, useState} from "react";
import iex from "../api/iex";
import Search from "../components/Search";
import util from "../util";

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
        </>
    );
}

export default Watchlist;
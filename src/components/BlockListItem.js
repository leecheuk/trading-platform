import React, { useState } from "react";
import SettingForm from "../components/SettingForm";
import FavouriteBtn from "../components/FavouriteBtn";

function BlockListItem(props) {
    const [showMinor, setMinor] = useState(false);

    function onClickItem() {
        setMinor(!showMinor);
    }

    function renderView() {
        const {stock, quote} = props;
        const title = props.title || `${stock.name} (${stock.symbol})`;
        const favourite = stock ? stock.isFavourite : null;

        switch(props.type) {
            case "searchlist":
                return (
                    <li className="block-list-item">
                        <div className="main">
                            <div className="block-left">
                                <FavouriteBtn 
                                    onClickFavourite={props.onClickFavourite} 
                                    favourite={favourite}/>
                                <div className="text-container">
                                    <div className="title"> {title}</div>
                                    <div className="subtitle">{props.subtitle}</div>
                                </div>
                            </div>
                            <div className="block-right">
                                <i className={`fas fa-angle-${showMinor ? "down" : "right"} fa-lg`}
                                    onClick={props.onClickItem}></i>
                            </div>
                        </div>
                    </li>
                );
            case "portfoliolist":
                return (
                    <li className="block-list-item">
                        <div className="main">
                            <div className="block-left">
                                <div className="text-container">
                                    <div className="title">{title}</div>
                                    <div className="subtitle">
                                        <span className="quote">@${parseFloat(props.stock.entry_price).toFixed(2)}</span> ●
                                    
                                    <span className="quantity"> {props.stock.quantity} shares</span> ●
                                        <span className="gain"> {`${(props.quote - props.stock.entry_price) * 100 / props.stock.entry_price}%`}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="block-right">
                                    <button className="btn btn-info btn-sm" 
                                        onClick={props.onClickSell.bind(null, props.symbol, props.stock.portfolio_id)}>
                                            Sell
                                    </button>
                            </div>
                            </div>
                        </li >
                );
            case "watchlist":
                return (
                    <li className="block-list-item">
                        <div className="main">
                            <div className="block-left">
                                <FavouriteBtn
                                    onClickFavourite={props.onClickFavourite}
                                    favourite={favourite} />
                                <div className="text-container">
                                    <div className="title"> {title} </div>
                                    <div className="subtitle">
                                        <span className="quote">${quote}</span>
                                         {/* ●
                                        <span className="gain"> {`${1.2}%`}</span>  */}
                                    </div>
                                </div>
                            </div>
                            <div className="block-right">
                                <button className="btn btn-info btn-sm" onClick={props.onClickItem.bind(null, props.symbol)}>Buy</button>
                            </div>
                        </div>
                    </li >
                );
            default:
                return (
                    <li className="block-list-item">
                        <div className="main">
                            <div className="block-left">
                                <div className="text-container">
                                    <div className="title">{title}</div>
                                    <div className="subtitle">{props.subtitle}</div>
                                </div>
                            </div>
                            <div className="block-right">
                                <i className={`fas fa-angle-${showMinor ? "down" : "right"} fa-lg`}
                                    onClick={props.onClickItem ? props.onClickItem : onClickItem}></i>
                            </div>
                        </div>
                        {showMinor ? <div className="minor">
                            <SettingForm 
                                onSubmitAPI={props.onSubmitAPI}
                                onChangeAPI={props.onChangeAPI} 
                                apiKey={props.apiKey}/>
                        </div> : null}
                    </li>
                );
        }
    }
    return renderView();
}

export default BlockListItem;
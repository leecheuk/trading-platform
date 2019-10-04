import React, { useState } from "react";
import SettingForm from "../components/SettingForm";
import FavouriteBtn from "../components/FavouriteBtn";

function BlockListItem(props) {
    const [showMinor, setMinor] = useState(false);

    function onClickItem() {
        setMinor(!showMinor);
    }

    function renderView() {
        switch(props.type) {
            case "searchlist":
                return (
                    <li className="block-list-item">
                        <div className="main">
                            <div className="block-left">
                                <FavouriteBtn 
                                    onClickFavourite={props.onClickFavourite} 
                                    favourite={props.favourite}/>
                                <div className="text-container">
                                    <div className="title"> {props.title}</div>
                                    <div className="subtitle">{props.subtitle}</div>
                                </div>
                            </div>
                            <div className="block-right">
                                <i className={`fas fa-angle-${showMinor ? "down" : "right"} fa-lg`}
                                    onClick={props.onClickItem ? props.onClickItem : onClickItem}></i>
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
                                    <div className="title">{props.title}</div>
                                    <div className="subtitle">
                                        <span className="quote">{parseFloat(props.quote).toFixed(2)}</span> ●
                                    <span className="gain"> {`${1.2}%`}</span> ●
                                    <span className="quantity"> {props.quantity}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="block-right">
                                    <button className="btn btn-info btn-sm" onClick={props.onClickSell.bind(null, props.symbol)}>Sell</button>
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
                                    favourite={props.favourite} />
                                <div className="text-container">
                                    <div className="title"> {props.title} </div>
                                    <div className="subtitle">
                                        <span className="quote">{parseFloat(props.quote).toFixed(2)}</span> ●
                                    <span className="gain"> {`${1.2}%`}</span> ●
                                    <span className="quantity"> {props.quantity}</span>
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
                                    <div className="title">{props.title}</div>
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
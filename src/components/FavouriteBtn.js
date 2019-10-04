import React from "react";

function FavouriteBtn(props) {
    const isFav = props.favourite ? " active" : "";
    return (
        <span className="fav">
            <i className={"fas fa-heart fa-lg" + isFav} onClick={props.onClickFavourite}></i>
        </span>
    );
}

export default FavouriteBtn;
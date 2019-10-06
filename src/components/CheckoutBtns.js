import React from "react";

function CheckoutBtns(props) {
    return (
        <div className="checkout-btns">
            <button className="btn btn-primary" onClick={props.onClickSubmit} disabled={props.disabled}>
                Submit
            </button>
            <button className="btn btn-info" onClick={props.onClickCancel}>
                Cancel
            </button>
        </div>
    )
}

export default CheckoutBtns;
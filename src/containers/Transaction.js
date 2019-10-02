import React, {useState} from "react";
// components
import TransactionForm from "../components/TransactionForm";
import CheckoutBtns from "../components/CheckoutBtns";

function Transaction(props) {
    const [quantity, setQuantity] = useState(1);
    function onChangeQuantity(e) {
        setQuantity(e.target.value);
    }
    function onClickCancel() {
        props.history.push('/');
    }
    return (
            <>
                <TransactionForm 
                    price={100}
                    symbol={"AAPL"}
                    name={"Apple Inc"}
                    quantity={quantity} 
                    onChangeQuantity={onChangeQuantity}/>
                <CheckoutBtns onClickCancel={onClickCancel} />
            </>
    )
}

export default Transaction;
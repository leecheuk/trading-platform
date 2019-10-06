import React, {useState, useEffect} from "react";
import OrderTable from "../components/OrderTable";
import Order from "../containers/Order";
import db from "../api/db";

function OrderList() {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        var isSubscribed = true;
        db.getOrders((row) => {
            if (isSubscribed) {
                setHistory(row);
            }
        })

        return () => {
            isSubscribed = false;
            db.removeOrdersListener();
        }
    }, []);
    return (
        <>
            <OrderTable>
                {history.map((h, i) => (
                    <Order key={i} data={h} />
                ))}
            </OrderTable>
        </>
    )
}

export default OrderList;
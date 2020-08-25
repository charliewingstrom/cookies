import React from 'react';

export default
function OrderListing(props) {
    const orderItems = [] 
    for (var i = 0; i < props.order.length; i+=2) {
        orderItems.push({
            "name": props.order[i],
            "amountOrdered": props.order[i+1]
        })
    }
    return (
        <div className={"cookieListing"}>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.phoneNumber}</p>
            <p>Order:</p>
            {
            orderItems.map((order, index) => (
                <p key={index}>- {order.name}: {order.amountOrdered}x</p>
            ))
            }
            <p>Total: ${props.total}</p>
            <p>Time Ordered: {props.timeOrdered}</p>
        </div>
    )
}
import React from 'react';

export default
function OrderListing(props) {
    
    return (
        <div className={"cookieListing"}>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.phoneNumber}</p>
            {
                props.order.map((orderItem, index) => (
                    console.log(orderItem)
                ))
            }
        </div>
    )
}
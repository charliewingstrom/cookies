import React from 'react';
import OrderListing from '../orderListing';
export default 
function viewOrders(props) {
    if (props.orders && props.loggedIn)
    {
        // made the json into an array for easier iteration with map
        var orderArray = [];
        Object.keys(props.orders).forEach(function(key) {
            orderArray.push(props.orders[key]);
        })
        return (
            <div className={"page aboutPage"}>
                {
                orderArray.map((order, index) => (
                    <OrderListing
                        key={index}
                        name={order.name}
                        email={order.email}
                        phoneNumber={order.phoneNumber}
                        order={order["order"]}
                        total={order.total}
                        timeOrdered={order.timeOfOrder}
                    />    
                ))
                }
            </div>
        )
    }
    else {
        // orders have not loaded yet
        return (
            <div className={'storeFront'}>
                <h1>loading...</h1>
            </div>
        )
    }
}
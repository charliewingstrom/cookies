import React from 'react';
import OrderListing from '../orderListing';
import axios from 'axios';

function getOrdersAsCSV() {
    axios
    .get("http://localhost:5000/ordersAsCSV")
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log("get orders as csv error: ", err)
    })
}
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
                <button onClick={getOrdersAsCSV}>Get orders as a Spreadsheet</button>
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
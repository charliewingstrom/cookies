import React from 'react';
import OrderListing from '../orderListing';
import axios from 'axios';


var deleteAllOrders = async () => {
    if (window.confirm("Are you sure you want to delete all orders?")) {
        axios
        .post("http://localhost:5000/removeOrders")
        .then( response => {
            console.log(response)
        })
        .catch(err => {
            console.log("Delete All Orders error: ", err)
        })
    }
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
                <div className={'page'}>
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
                <button onClick={() => window.open("http://localhost:5000/ordersAsCSV")}>Get orders as a Spreadsheet</button>
                <button onClick={deleteAllOrders}>Delete all orders</button>
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
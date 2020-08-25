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
        <div className={"order"}>
        	<p>{props.name}		|	{props.email}    |   {props.phoneNumber}</p>
			<div className={"orderInner"}>
				<p>{
				orderItems.map((order, index) => (
					<div key={index}>- {order.name}: {order.amountOrdered}x</div>
				))
				}</p>
				<div className={"orderRightInfo"}>
					<p>Total: ${props.total}</p>
					<p>{props.timeOrdered}</p>
				</div>
			</div>
        </div>
    )
}
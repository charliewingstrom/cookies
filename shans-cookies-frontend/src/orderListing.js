import React from 'react';

export default
function OrderListing(props) {
    return (
        <div className={"order"}>
        	<p>{props.name}		|	{props.email}    |   {props.phoneNumber}</p>
			<div className={"orderInner"}>
				<div>{
				Object.keys(props.order).map((order, index) => (
					<div key={index}>- {order}: {props.order[order]}x</div>
				))
				}</div>
				<div className={"orderRightInfo"}>
					<p>Total: ${props.total}</p>
					<p>{props.timeOrdered}</p>
				</div>
			</div>
        </div>
    )
}
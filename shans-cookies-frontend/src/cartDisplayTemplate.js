import React from 'react';
import config from './config';
export default function CartDisplay(props) {
    return (
        <div className={"cookieListing"} key={props.name}>
            <img src={config.serverURL() + '/images/' + props.imageLocation} alt="Cookie"></img>
            <h2>{props.name}</h2>
            <h3><strong>${props.price}</strong> / Each</h3>
            <h3>Quantity: {props.amount}</h3>
            <h3>= ${props.amount * props.price}</h3>
        </div>
    )
}
import React from 'react';

export default
function Cookie(props) {
        return (
            <div>
                <img src={props.pictureSrc} alt="Cookie"></img>
                <h3>{props.name}</h3>
                <h3>{props.price}$</h3>
                <p>There are {props.amount} of these left!</p>
            </div>
        )
}
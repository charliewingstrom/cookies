import React from 'react';

export default
function Cookie(props) {
    var amount;
    if (props.amount<=0) {
        amount = <p>Sold Out!</p>
    }
    else {
        amount =
            <div> 
            <p><strong>{props.amount}</strong> of these left!</p>
            <button onClick={() => props.orderMe(1, props.name)}>Order Me!</button>
            </div>
    }
        return (
            <div className={"cookieListing"} key={props.index}>
                <img src={props.pictureSrc} alt="Cookie"></img>
                <h3>{props.name}</h3>
                <h3>${props.price}</h3>
                {amount}
            </div>
        )
}
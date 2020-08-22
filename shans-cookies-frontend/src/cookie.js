import React from 'react';

export default
function Cookie(props) {
    var amount;
    var numberToOrder=1;
    var handleInput = event => {
        numberToOrder = event.target.value;
    }
    var order = () => {
        props.orderMe(Number(numberToOrder))
    }
    if (props.amount<=0) {
        amount = <p>Sold Out!</p>
    }
    else {
        amount =
            <div> 
            <p><strong>{props.amount}</strong> remaining</p>
            <form>
                <input 
                    className={"numberInput"}
                    type="number" 
                    onChange={handleInput}
                />
                <button type="button" onClick={order}>Add to Cart</button>
            </form>
            </div>
    }
        return (
            <div className={"cookieListing"} key={props.index}>
                <img src={props.pictureSrc} alt="Cookie"></img>
                <h3>{props.name}</h3>
                <h3><strong>${props.price}</strong> / each</h3>
                {amount}
            </div>
        )
}
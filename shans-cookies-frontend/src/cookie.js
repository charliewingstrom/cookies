import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

export default function Cookie(props) {
    var amount;
    var removeButton;
    var numberToOrder=1;
    var handleInput = event => {
        numberToOrder = event.target.value;
    }
    var order = () => {
        props.orderMe(Number(numberToOrder))
    }
    var removeCookie = () => {
        if (window.confirm("Are you Sure you want to delete this cookie?")) {
            props.removeCookie()
        }
    }
    if (props.amount<=0) {
        amount = <p>Sold Out!</p>
    }
    else {
        amount =
            <div> 
                <p><strong>{props.amount}</strong> Remaining</p>
                <form>
                    <TextField 
                        className={"cookieNumberInput"}
                        type="number" 
                        onChange={handleInput}
                        size="small"
                        variant="outlined"
                        placeholder="1"
                    />
                    <Button variant="outlined" 
                        className={"cookieAddToCartButton"}
                        style={{
                            backgroundColor: "#00ccff",
                            fontSize: 16,
                            color: "white",
                            marginRight: 0,
                            marginLeft: "1em",
                        }}
                        onClick={order}>Add to Cart
                    </Button>
                </form>
            </div>
    }
    if (props.signedIn) {
        removeButton = 
            <Button variant="outlined" 
                className={"cookieAddToCartButton"}
                style={{
                    backgroundColor: "#00ccff",
                    fontSize: 16,
                    color: "white",
                    marginRight: 0,
                    marginLeft: "1em",
                }}
                onClick={removeCookie}>Remove Cookie
            </Button>
    }
    return (
        <div className={"cookieListing"} key={props.index}>
            <img src={'http://localhost:5000/images/' + props.pictureSrc} alt="Cookie"></img>
            <h2>{props.name}</h2>
            <h3><strong>${props.price}</strong> / Each</h3>
            {amount}
            {removeButton}
        </div>
    )
}
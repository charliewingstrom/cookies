import React from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

export default function Cookie(props) {
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
            <p><strong>{props.amount}</strong> Remaining</p>
            <form>
                <TextField 
                    className={"numberInput"}
                    type="number" 
                    onChange={handleInput}
                    size="small"
                    variant="outlined"
                    placeholder="1"
                />
                <Button variant="outlined" 
                    style={{
                        backgroundColor: "#00ccff",
                        fontSize: 16,
                        color: "white",
                        marginRight: 0,
                        marginLeft: "1em",
                        
                    }}
                    onClick={order}>Add to Cart</Button>
            </form>
            </div>
    }
        return (
            <div className={"cookieListing"} key={props.index}>
                <img src={'http://localhost:5000/images/' + props.pictureSrc} alt="Cookie"></img>
                <h3>{props.name}</h3>
                <h3><strong>${props.price}</strong> / Each</h3>
                {amount}
            </div>
        )
}
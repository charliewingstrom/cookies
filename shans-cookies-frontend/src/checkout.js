import React from 'react';
import Button from "@material-ui/core/Button";
export default
function checkout(props) {
    return (
        <div>
            <div className={'cartStorefront'}>
            {
                Object.entries(props.cart)
                .map( ([key, value]) => <p className={"cartItem"}>{key}: {value}</p> )
              
            }
            <p className={"total"}>Total: ${props.total.toFixed(2)}</p>
            <Button variant="outlined" 
                style={{
                    backgroundColor: "#00ccff",
                    fontSize: 16,
                    color: "white",
                    marginRight: 0,
                    marginLeft: "1em",
                }}
                onClick={() => props.clearCart()}>Clear Cart
            </Button>
            </div>
            <form id="myForm" method="POST" className={'checkoutBar'}>
                <div className={'cookieListing'}>
                    <p>Name: </p>
                    <input name="name" required/>
                </div>
                <div className={'cookieListing'}>
                    <p>Email: </p>
                    <input name="email" required/>
                </div>
                <div className={'cookieListing'}>
                    <p>Phone Number: </p>
                    <input name="phoneNumber"/>
                </div >
                    <input type="hidden" name="total" value={props.total} readOnly={true}/>
                <div>
                    <input name="cart" type="hidden" value={Object.entries(props.cart)} readOnly={true}/>
                    <input type="submit" value="Submit" onSubmit={() => props.clearCart()}/>
                </div>
            </form>
        </div>
    )
}
import React from 'react';
import { Typography } from '@material-ui/core';

export default
function checkout(props) {
    return (
        <div className={'storeFront aboutPage'}>
            <Typography variant="h6">
                Here is your cart
            <div >
            <form id="myForm" method="POST" className={'checkoutBar'}>
                <div className={'cookieListing'}>
                    <p>Name: </p>
                    <input name="name"/>
                </div>
                <div className={'cookieListing'}>
                    <p>Email: </p>
                    <input name="email"/>
                </div>
                <div className={'cookieListing'}>
                    <p>Phone Number: </p>
                    <input name="phoneNumber"/>
                </div >
                <div className={'cookieListing'}>
                    <p>Total</p>
                    <input name="total" value={props.total} readOnly={true}/>
                </div>
                <div className={'cookieListing'}>
                    <p>Cart: </p>
                    <input name="cart" value={Object.entries(props.cart)} readOnly={true}/>
                    <input type="submit" value="Submit" />
                </div>
                
            </form>
            </div>
            </Typography>
            
        </div>
    )
}
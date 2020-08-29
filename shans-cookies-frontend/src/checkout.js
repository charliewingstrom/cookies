import React from 'react';

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
            <div onClick={()=>props.clearCart()}>
            <p className={"total"} >Clear Cart</p>
            </div>
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
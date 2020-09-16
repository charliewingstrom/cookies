import React from 'react';
import Cookie from '../cookie.js';
import Button from "@material-ui/core/Button";
export default 
function StoreFront(props) {
    if (props.cookies)
    {
        var cookieArray = props.cookies
        /*
        getCookiesFromBackend = async () => {
            const response = await fetch('/cookies_backend');
            const body = await response.json();
            if (response.status !== 200) {
                throw Error(body.message)
            }
            return body;
        }*/
        return (
            <div className={'page'}>
                <div className={'cartBar'}>
                    <p className={"cartItem"}>Cart:</p>
                    {
                        Object.entries(props.cart)
                        .map( ([key, value], index) => <p className={"cartItem"} key={index}>{key}: {value}</p> )
                    
                    }
                    <p className={"total"}>Total: ${props.total.toFixed(2)}</p>
                    <Button 
                        variant="contained" 
                        style={{
                            backgroundColor: "#00ccff",
                            fontSize: 16,
                            color: "white",
                            marginRight: '1em',
                            marginLeft: "1em",
                            height: '3em',
                            marginTop:'0.75em'
                        }}
                        onClick={() => props.clearCart()}>Clear Cart
                    </Button>
                </div>
                <div className={'storeFront'}>{
                        cookieArray.map((cookie, index) => (
                            <Cookie 
                                key={index}
                                name={cookie.name} 
                                pictureSrc={cookie.imageLocation} 
                                price={cookie.price} 
                                amount={cookie.amountLeft}
                                orderMe={(amount) => props.orderMe(amount,cookie.name,cookie.price)}
                                signedIn={props.signedIn}
                                removeCookie={() => props.removeCookie(cookie.name)}
                            />
                        ))
                }</div>
            </div>
        )
    }
    else {
        // cookies have not loaded yet
        return (
            <div className={'page aboutPage'}>
                <h1>Loading...</h1>
            </div>
        )
    }
}
import React from 'react';
import cookieURL from './cookie.jpg';
import Cookie from './cookie.js';
export default 
function StoreFront(props) {
    if (props.cookies)
    {
        // made the json into an array for easier iteration with map
        var cookieArray = [];
        Object.keys(props.cookies).forEach(function(key) {
            cookieArray.push(props.cookies[key]);
        })
    return (
        <div>
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
                    <p>Cart: </p>
                    <input name="cart" value={Object.entries(props.cart)} readOnly={true}/>
                    <input type="submit" value="Submit" />
                </div>
            </form>
            </div>
            <div className={'storeFront'}>
                {
                    cookieArray.map((cookie, index) => (
                        <Cookie 
                            key={index}
                            name={cookie.name} 
                            pictureSrc={cookieURL} 
                            price={cookie.price} 
                            amount={cookie.amountLeft}
                            orderMe={(amount) => props.orderMe(amount,cookie.name)}
                        />
                    ))
                }
            </div>
            
        </div>
    )
    }
    else {
        // cookies have not loaded yet
        return (
            <div className={'storeFront'}>
                <h1>loading...</h1>
            </div>
        )
    }
}
/*
<form id="myForm" method="POST" className={'cookieListing'}>
                <Typography>
                    <p>Name: </p>
                    <input name="name"/>
                </Typography>
                <Typography>
                    <p>Email: </p>
                    <input name="email"/>
                </Typography>
                <Typography>
                    <p>Phone Number: </p>
                    <input name="phoneNumber"/>
                </Typography>
                <Typography>
                    <p>Cart: </p>
                    <input name="cart" value={Object.entries(props.cart)} readOnly={true}/>
                </Typography>
                <Typography>
                <input type="submit" value="Submit" />
                </Typography>
            </form>*/
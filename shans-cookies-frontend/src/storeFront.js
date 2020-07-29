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
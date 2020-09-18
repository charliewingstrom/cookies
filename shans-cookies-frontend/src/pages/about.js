import React from 'react';
export default
function about() {
    return (
        <div className={'page aboutPage'}>
            <h1>{`
                You can add cookies to your cart on the homepage, then hit the checkout button to finalize your order.
                After you place your order you should recieve an email with more information.
                For more information, or to place a custom order, please contact : someemail@email.com
            `}</h1>
        </div>
    )
}
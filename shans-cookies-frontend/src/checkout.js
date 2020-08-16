import React from 'react';
import { Typography } from '@material-ui/core';

export default
function checkout(props) {
    return (
        <div className={'storeFront aboutPage'}>
            <Typography variant="h6">
                Here is your cart
                <form id="myForm" method="POST">
                    <Typography>
                        <input name="cart" value={Object.entries(props.cart)} readOnly={true}/>
                    </Typography>
                    <Typography>
                    <input type="submit" value="Submit" />
                    </Typography>
                </form>
            </Typography>
            
        </div>
    )
}
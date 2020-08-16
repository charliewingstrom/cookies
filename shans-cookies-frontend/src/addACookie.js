import React from 'react';
import { Typography } from '@material-ui/core';

export default
function addACookie() {
    return (
        <div className={'storeFront aboutPage'}>
            <Typography variant="h6">
                Here is where you can add a cookie to the store.
            
                <form method="POST">
                    <Typography variant="h6">
                        Name
                    </Typography>
                    <input type="text" name="cookieName" />
                    <Typography variant="h6">
                        Price per cookie
                    </Typography>
                    <input type="text" name="price" />
                    <Typography variant="h6">
                        Amount to sell
                    </Typography>
                    <input type="text" name="amount" />
                </form>
            </Typography>
        </div>
    )
}
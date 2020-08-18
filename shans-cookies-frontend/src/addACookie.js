import React from 'react';
import { Typography } from '@material-ui/core';

export default
function addACookie() {
    return (
        <div className={'storeFront'}>
            <div className={'cookieListing'}>
                <Typography variant="h6">
                    Here is where you can add a cookie to the store.
                
                    <form method="POST">
                        <Typography variant="h6">
                            Name of Cookie
                        </Typography>
                        <input type="text" name="cookieName" />
                        <Typography variant="h6">
                            Price per Cookie
                        </Typography>
                        <input type="text" name="price" />
                        <Typography variant="h6">
                            Amount to sell
                        </Typography>
                        <input type="text" name="amount" />
                        <input type="submit" value="Submit" />
                    </form>
                </Typography>
            </div>
        </div>
    )
}
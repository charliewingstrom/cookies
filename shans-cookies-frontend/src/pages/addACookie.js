import React from 'react';
import { Typography } from '@material-ui/core';
export default (props) => {
    if (props.loggedIn) {
        return (
            <div className={'page'}>
                <div className={'cookieListing'}>
                    <form action="/addACookie" method="POST" encType="multipart/form-data">
                        <Typography variant="h6">Name of Cookie</Typography>
                        <input type="text" name="name" required />
                        <Typography variant="h6">Price ($)</Typography>
                        <input type="number" name="price" required />
                        <Typography variant="h6">Amount</Typography>
                        <input type="number" name="amount" required />
                        <Typography variant="h6">Image</Typography>
                        <input type="file" accept="image/*" name="photo" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }else return null;
}
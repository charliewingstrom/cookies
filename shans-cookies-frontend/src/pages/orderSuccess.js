import React from 'react';
import { Typography } from '@material-ui/core';

export default
function about() {
    return (
        <div className={'page aboutPage'}>
            <Typography variant="h6">
                Thank You for your Order! Please check the email you provided for details.
            </Typography>
        </div>
    )
}
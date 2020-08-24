import React from 'react';
import { Typography } from '@material-ui/core';

export default
function error() {
    return (
        <div className={'storeFront aboutPage'}>
            <Typography variant="h6">
                Sorry! There was a problem with your order. Please <a href='/'>go back to the front and try again</a>
            </Typography>
        </div>
    )
}
import React from 'react';
import { render } from '@testing-library/react';
import { Typography } from '@material-ui/core';

export default
function about() {
    return (
        <div className={'storeFront aboutPage'}>
            <Typography variant="h6">
                This is the about page
            </Typography>
        </div>
    )
    
}
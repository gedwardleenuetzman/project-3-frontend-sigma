import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'

import AccountMenu from 'src/AccountMenu'
import RouteDrawer from 'src/RouteDrawer'

/**
 * 
 * @param {*} param layout, title, children
 * @returns The standard app bar
 */
const StandardAppBar = ({ layout, title, children }) => {
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <RouteDrawer layout={layout} />

                    <Typography variant="h6" component="div" sx={{ pl: 3, flexGrow: 1 }}>
                        {title}
                    </Typography>

                    <AccountMenu />

                    {children}

                </Toolbar>
            </AppBar>

            <Toolbar />
        </React.Fragment>
    );
}

export default StandardAppBar
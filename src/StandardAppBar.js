import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'

import AccountMenu from 'src/AccountMenu'
import RouteDrawer from 'src/RouteDrawer'

const StandardAppBar = ({ tags, layout, title, children }) => {
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <RouteDrawer tags={ tags } layout={ layout }/>

                    <Typography variant="h6" component="div" sx={{ pl: 3, flexGrow: 1 }}>
                        { title }
                    </Typography>
                    
                    <div id="google_translate_element"></div>

                    <AccountMenu/>

                    { children }
                    
                </Toolbar>
            </AppBar>

            
        </React.Fragment>
    );
}

export default StandardAppBar
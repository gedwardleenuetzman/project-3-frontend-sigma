import * as React from 'react';
import { Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton } from '@mui/material';
import Logout from '@mui/icons-material/Logout';

import { useSession, signIn, signOut, getSession } from "next-auth/react"

/**
 * 
 * @returns The account menu
 */
export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const { data: session, status } = useSession()

    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = (str) => {
        setAnchorEl(null)
    };

    return (
        <React.Fragment>    
            {status == "authenticated" ? (
                <React.Fragment>
                    <IconButton onClick={handleClick}>
                        <Avatar src={session.user.image}>{session.user.name[0]}</Avatar>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
                        <MenuItem onClick={handleClose}>{session.user.email}</MenuItem>
                        <Divider/>
                        <MenuItem onClick={() => {handleClose(); signOut();}}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            ) : (
                <Button onClick={signIn} size="large" variant="contained" color="error">
                    Login
                </Button>
            )}
        </React.Fragment> 
    )
}
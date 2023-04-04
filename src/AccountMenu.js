import * as React from 'react';
import { Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton } from '@mui/material';
import Logout from '@mui/icons-material/Logout';

import { useSession, signIn, signOut, getSession } from "next-auth/react"

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
        <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
            {status == "authenticated" ? (
                <React.Fragment>
                    <IconButton sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'}} onClick={handleClick}>
                        <Avatar src={session.user.image} sx={{ width: 36, height: 36 }}>{session.user.name[0]}</Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>{session.user.email}</MenuItem>
                        <Divider/>
                        <MenuItem onClick={() => {handleClose(); signOut();}}><ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout</MenuItem>
                    </Menu>
                </React.Fragment>
            ) : (
                <Button onClick={signIn} size="large" variant="contained" color="error">
                    Login
                </Button>
            )}
        </div>
    )
}
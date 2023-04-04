import * as React from 'react';
import { Box, Drawer, IconButton, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';

export default function TemporaryDrawer(props) {
    const anchor = 'left'
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    
    const toggleDrawer = (b) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setOpen(b)
    };

    const clicked = (route) => () => {
        router.push(route)
    }

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {props.layout.map((items, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                        {items.map((item, itemIndex) => (
                            <ListItem key={itemIndex} disablePadding>
                                <ListItemButton onClick={clicked(item.route)} selected={router.pathname.startsWith(item.route)}>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider/>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1 }}>
            <IconButton sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'}} onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ height: 36, width: 36}}/>
            </IconButton>
            <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </Box>
    )
}

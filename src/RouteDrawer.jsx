import * as React from 'react';
import { Box, Drawer, IconButton, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';

export default function RouteDrawer(props) {
    const anchor = 'left'
    const router = useRouter()
    const [open, setOpen] = React.useState(false)

    const toggleDrawer = (b) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setOpen(b)
    };

    console.log('rd', props.tags)

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {props.layout.map((items, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                        {items.map((item, itemIndex) => {
                            if ((!item.showWhenRouteStartsWith || router.pathname.startsWith(item.showWhenRouteStartsWith)) && (!item.tags || !props.tags || (props.tags && item.tags.some(tag => props.tags.includes(tag))))) {
                                return (
                                    <ListItem key={itemIndex} disablePadding>
                                        <ListItemButton href={item.route} selected={router.pathname == item.route}>
                                        <ListItemText primary={item.text}/>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            }
                            return null;
                        })}
                        <Divider/>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <React.Fragment>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon/>
            </IconButton>
            <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </React.Fragment>
    )
}
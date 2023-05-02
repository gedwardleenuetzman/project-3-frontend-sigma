import * as React from 'react';

import { Card, CardContent, CardMedia, Typography, Box, Drawer, IconButton, List, Divider, ListItem, Button } from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Counter = ({ value, onIncrement, onDecrement }) => {
    const handleOnClick = (fn) => (event) => {
        event.stopPropagation();
        fn()
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleOnClick(onIncrement)} sx={{m: 1}} aria-label="delete" size="small">
                <AddIcon fontSize="inherit" />
            </IconButton>

            <Typography>
                { value || 0 }
            </Typography>

            <IconButton onClick={handleOnClick(onDecrement)} sx={{m: 1}} aria-label="delete" size="small">
                <RemoveIcon fontSize="inherit" />
            </IconButton>
        </Box>
    )
}

export default function CartDrawer({ order, onIncrement, onDecrement, onOrder }) {
    const anchor = 'right'
    const [open, setOpen] = React.useState(false)
    
    const toggleDrawer = (b) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setOpen(b)
    };

    const handleFn = (fn, index) => () => {
        fn(index)
    }

    const calcTotal = () => {
        let total = 0

        for (let i = 0; i < order.length; i++) {
            total += (order[i].item.price * order[i].quantity)
        }

        return total
    }

    const formatTotal = (total) => {
        return total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }

    const list = () => (
        <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            {<List>
                {order.map(({item, quantity}, index) => (
                    <ListItem key={index}>
                        <Card sx={{ width: '100%', display: 'flex' }}>
                            <CardMedia component="img" sx={{ height: 100, width: 100 }} image={ item.image || "data:image/jpeg;base64,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" }/>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ml: 2, mt: 1, mr: 2}} variant="subtitle1" color="text.secondary" component="div">
                                    { item.name || "LongFoodName" }
                                </Typography>
                                <Counter value={quantity} onIncrement={handleFn(onIncrement, index)} onDecrement={handleFn(onDecrement, index)}/>
                            </Box>

                        </Card>
                    </ListItem>
                ))}
            </List>}
        </Box>
    );

    return (
        <React.Fragment>
            <IconButton onClick={toggleDrawer(true)}>
                <ShoppingCartIcon/>
            </IconButton>
            <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
                {list()}
                <Divider/>
                <Typography sx={{m: 2}}>Total: {formatTotal(calcTotal())}</Typography>
                <Button 
                    disabled={order.length == 0} 
                    variant="contained" 
                    sx={{ml: 2, mr: 2}}
                    onClick={onOrder}
                >
                    Order
                </Button>
            </Drawer>
        </React.Fragment>
    )
}

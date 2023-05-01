// Ralph Vicente 

import React from 'react';

import { Pagination, Grid, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { auto } from '@popperjs/core';
import { styled } from '@mui/material/styles';

const DRAWER_LAYOUT = [
    [{ text: "Home", route: "/Home" }],
    [{ text: "Customer Ordering", route: "/CustomerOrder/CustomerOrder" }],
    [{ text: "Order", route: "/Order" }, { text: "Manage", route: "/Manage" }],
    [
        { text: "Update Inventory", route: "/Manage/UpdateInventory" },
        { text: "Update Menu", route: "/Manage/UpdateMenu" },
        { text: "Sales Report", route: "/Manage/SalesReport" },
    ]
]

const Fade = styled('div')(({ theme }) => ({
    animation: `${theme.transitions.create('opacity', {
      duration: theme.transitions.duration.standard,
    })}`,
  }));

const Manage = () => {

    const styles = {
        media: {
            height: '100px',
            width: '100px',
            margin: auto,
        },
        button: {
            margin:auto
        }
    };

    return (
        <React.Fragment>
            <StandardAppBar title="Manager" layout={DRAWER_LAYOUT} />
            <Box sx={{m: 4}}>
                <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                rowSpacing={1} 
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs="auto" >
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <CardMedia
                                    component="img"
                                    image="https://www.pngall.com/wp-content/uploads/5/Box.png"
                                    alt="Update Inventory Box image"
                                    style={styles.media}
                                />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Update Inventory
                                </Typography>
                                <Typography variant="body2">
                                    Menu to update inventory manually
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="medium" href="/Manage/UpdateInventory" style={styles.button}>Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs="auto">
                        <   Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <CardMedia
                                    component="img"
                                    image="https://cdn-icons-png.flaticon.com/512/151/151409.png"
                                    alt="Update Menu image"
                                    style={styles.media}
                                />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Update Menu
                                </Typography>
                                <Typography variant="body2">
                                    Menu to update the menu manually
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="medium" href="/Manage/UpdateInventory" style={styles.button}>Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs="auto">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <CardMedia
                                    component="img"
                                    image="https://cdn-icons-png.flaticon.com/512/3731/3731754.png"
                                    alt="Z Report Image"
                                    style={styles.media}
                                />
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Manager Reports
                                </Typography>
                                <Typography variant="body2">
                                    Generate various reports detailing restaurant performance.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="medium" href="/Manage/Reports">Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default Manage
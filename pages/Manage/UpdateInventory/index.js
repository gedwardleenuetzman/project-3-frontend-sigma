import React from 'react';

import { Pagination, Grid, Paper, Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import RouteDrawer from 'src/RouteDrawer'
import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'
import IngredientCard from 'src/UpdateInventory/IngredientCard'

export default function UpdateInventory() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
      const fetchData = async () => {
        const res = await fetch('/api/manage/search');
        const json = await res.json();
        setData(json);
      };
  
      fetchData();
    }, []);

    return (
        <React.Fragment>
            <StandardAppBar title="Update Inventory" layout={[
                [{text: "Home", route: "/Home"}],
                [{text: "Order", route: "/Order"}, {text: "Manage", route: "/Manage"}],
                [  
                    {text: "Update Inventory", route: "/Manage/UpdateInventory"}, 
                    {text: "Update Menu", route: "/Manage/UpdateMenu"},
                    {text: "Sales Report", route: "/Manage/SalesReport"},
                ]
            ]}/>
            
            <Box sx={{ m: 4, display: 'flex' }}>
                <SearchBar/>
                <Button sx={{ml: 2}} variant="outlined">Create</Button>
            </Box>
        
            <Pagination sx={{m: 4}} count={10} variant="outlined" color="primary"/>

            <Box sx={{m: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs="auto">
                        <IngredientCard/>
                    </Grid>
                </Grid>
            </Box>

        </React.Fragment>
    )
}
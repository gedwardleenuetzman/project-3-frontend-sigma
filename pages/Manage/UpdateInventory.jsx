import React from 'react';

import { Pagination, Grid, Paper, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'

import IngredientCard from 'src/UpdateInventory/IngredientCard'
import IngredientDialog from 'src/UpdateInventory/IngredientDialog'

export default function UpdateInventory() {
	const [page, setPage] = React.useState(1)
	const [filter, setFilter] = React.useState("")
	const [content, setContent] = React.useState({})

    React.useEffect(() => {
      	const fetchContent = async () => {
			const res = await fetch(`/api/manage/inventory/search?filter=${ filter }&page=${ page }`, { 
				method: "GET", 
				headers: {
					'Content-Type': 'application/json'
				}
			})

        	const json = await res.json()

        	setContent(json);
      	};

		fetchContent();
    }, []);

	const createClicked = () => {
		setMode({
			mode: "creating",
		})
	}

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
        
			<IngredientDialog mode={dialog.mode} data={content} open={open} onClose={()=>{setDialog({mode: "nothing"})}}/>

            <Box sx={{ m: 4, display: 'flex' }}>
            	<SearchBar onSearch={ setFilter }/>
                <Button sx={{ ml: 2 }} variant="outlined" onClick={()=>{ setDialog({mode: "creating"} )}}>Create</Button>
            </Box>
        
            <Pagination sx={{m: 4}} count={ content.pages } page={ page } onChange={ setPage } variant="outlined" color="primary"/>

            <Box sx={{m: 4}}>
                <Grid container spacing={2}>
					{content.rows && content.rows.map((row, index) => (
                    	<Grid item xs="auto">
                        	<IngredientCard name={ row.name } description={ row.description } image={ row.image }/>
                    	</Grid>
					))}
                </Grid>
            </Box>

        </React.Fragment>
    )
}
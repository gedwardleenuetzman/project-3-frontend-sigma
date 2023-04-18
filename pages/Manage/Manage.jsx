// Ralph Vicente 

import React from 'react';

import { Pagination, Grid, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'

import SearchCard from 'src/SearchCard'
import DialogForm from 'src/DialogForm'

const DIALOG_LAYOUT = [
	{name: "name", type: "text"},
	{name: "image", type: "text"},
	{name: "threshold", type: "number"},
	{name: "quantity", type: "number"},
]

const DRAWER_LAYOUT = [
	[{text: "Home", route: "/Home"}],
	[{text: "Order", route: "/Order"}, {text: "Manage", route: "/Manage"}],
	[  
		{text: "Update Inventory", route: "/Manage/UpdateInventory"}, 
		{text: "Update Menu", route: "/Manage/UpdateMenu"},
		{text: "Sales Report", route: "/Manage/SalesReport"},
	]
]

const CREATE_DIALOG_INITIAL = {
	name: "Name", 
	image: "URL", 
	quantity: 0, 
	threshold: 0
}

const fetchContent = async (filter, page) => 
	await (await fetch(`/api/manage/inventory/search?filter=${ filter }&page=${ page }`, { method: "GET" })).json()
	
const Manage = () => {
	const [page, setPage] = React.useState(1)
	const [filter, setFilter] = React.useState("")
	const [content, setContent] = React.useState({})
	const [count, setCount] = React.useState(0)

	const [open, setOpen] = React.useState(false)
	const [mode, setMode] = React.useState("create")
	const [editing, setEditing] = React.useState({})
	
    React.useEffect(() => {
      	fetchContent(filter, page).then(setContent)
    }, [filter, page, count]);

    return (
        <React.Fragment>
            <StandardAppBar title="Manager" layout={ DRAWER_LAYOUT }/>

            <Box sx={{m: 4}}>
                <Grid container spacing={2}>
					{0 && 0((row, index) => (
                    	<Grid key={index} item xs="auto">
                        	<SearchCard 
								name={"Update Inventory"} 
								image={ row.image } 
								description={ row.description } 
								actions={ ["Edit"] } 
								onAction={ () => { setMode("edit"); setOpen(true); setEditing({...row})  } }
							/>
                    	</Grid>
					))}
                </Grid>
            </Box>

            <Box sx={{m: 4}}>
                <h1>Hello World!</h1>
                <h1>Hello World!</h1>
                <h1>Hello World!</h1>
            </Box>

        </React.Fragment>
    )
}

export default Manage
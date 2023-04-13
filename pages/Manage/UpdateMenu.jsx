import React from 'react';

import { Pagination, Grid, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'

import SearchCard from 'src/SearchCard'
import DialogForm from 'src/DialogForm'
import IngredientTable from 'src/IngredientTable'

export default function UpdateMenu() {
	const [page, setPage] = React.useState(1)
	const [filter, setFilter] = React.useState("")
	const [content, setContent] = React.useState({})
	const [open, setOpen] = React.useState(false)
	const [mode, setMode] = React.useState("create")
	const [editing, setEditing] = React.useState({})
	const [count, setCount] = React.useState(0)

    React.useEffect(() => {
      	const fetchContent = async () => {
			const res = await fetch(`/api/manage/menu/search?filter=${ filter }&page=${ page }`, { method: "GET" })
        	const json = await res.json()

        	setContent(json);
      	};

		fetchContent();
    }, [filter, page, count]);

	const dialogLayout = [
		{name: "name", type: "text"},
		{name: "description", type: "text"},
		{name: "image", type: "text"},
		{name: "price", type: "number"},
	]

	const drawerLayout = [
		[{text: "Home", route: "/Home"}],
		[{text: "Order", route: "/Order"}, {text: "Manage", route: "/Manage"}],
		[  
			{text: "Update Inventory", route: "/Manage/UpdateInventory"}, 
			{text: "Update Menu", route: "/Manage/UpdateMenu"},
			{text: "Sales Report", route: "/Manage/SalesReport"},
		]
	]

	const onAction = (action, form) => {
		setOpen(false)

		let url = ''
		let content = {headers: {'Content-Type': 'application/json'}}

		if (mode == "create" && action == "Create") {
			url = '/api/manage/menu/create'
			content.method = 'POST'
			content.body = JSON.stringify({...form})
		} else if (mode == "edit" && action == "Save") {  
			url = '/api/manage/menu/update'
			content.method = 'PUT'
			content.body = JSON.stringify({...editing, ...form})
		} else if (mode == "edit" && action == "Delete") {
			url = '/api/manage/menu/remove'
			content.method = 'PUT'
			content.body = JSON.stringify({id: editing.id})
		}

		fetch(url, content).finally(() => {
			setCount(count + 1)
		})
	}

    return (
        <React.Fragment>
            <StandardAppBar title="Update Menu" layout={ drawerLayout }/>

			<DialogForm 
				open={ open } 
				layout={ dialogLayout }
				onAction={ onAction }
				onClose={ () => setOpen(false) }
				initial={ mode == "edit" ? editing : {name: "Name", description: "Description", image: "URL", quantity: 0, threshold: 0} }
				title={ mode == "create" ? "Create Ingredient" : "Edit Ingredient" }
				actions={ mode == "create" ? ["Create", "Cancel"] : ["Save", "Delete", "Cancel"] }
			>
				<IngredientTable/>
			</DialogForm>

            <Box sx={{ m: 4, display: 'flex' }}>
            	<SearchBar onSearch={ (val) => setFilter(val) }/>
                <Button sx={{ ml: 2 }} variant="outlined" onClick={ () => { setMode("create"); setOpen(true) } }>Create</Button>
            </Box>
        
            <Pagination 
				sx={{m: 4}}
				variant="outlined" 
				color="primary"
				count={ content.pages } 
				page={ page } 
				onChange={ (event, value) => setPage(value) }
			/>

            <Box sx={{m: 4}}>
                <Grid container spacing={2}>
					{content.rows && content.rows.map((row, index) => (
                    	<Grid key={index} item xs="auto">
                        	<SearchCard 
								name={ row.name } 
								image={ row.image } 
								description={ row.quantity } 
								actions={ ["Edit"] } 
								onAction={ () => { setMode("edit"); setOpen(true); setEditing({...row})  } }
							/>
                    	</Grid>
					))}
                </Grid>
            </Box>

        </React.Fragment>
    )
}
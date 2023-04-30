import React from 'react';

import { Pagination, Grid, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'

import SearchCard from 'src/SearchCard'
import DialogForm from 'src/DialogForm'
import IngredientTable from 'src/IngredientTable'

import MANAGE_ROUTE_DRAWER_LAYOUT from 'src/DrawerLayouts/Manage'

const DIALOG_LAYOUT = [
	{name: "name", type: "text"},
	{name: "description", type: "text"},
	{name: "image", type: "text"},
	{name: "price", type: "number"},
]

const CREATE_DIALOG_INITIAL = {
	name: "Name", 
	image: "URL", 
	description: "Description", 
	price: 1,
}

const fetchContent = async (filter, page) => 
	await (await fetch(`/api/manage/menu/search?filter=${ filter }&page=${ page }`, { method: "GET" })).json()

const formatIngredients = (data) => {
	let ingredients = []

    data.forEach((row) => {
		ingredients.push({id: row.ingredient.id, quantity: row.quantity})
    })
		
	return ingredients
}

const UpdateMenu = () => {
	const [page, setPage] = React.useState(1)
	const [filter, setFilter] = React.useState("")
	const [content, setContent] = React.useState({})
	const [count, setCount] = React.useState(0)

	const [open, setOpen] = React.useState(false)
	const [mode, setMode] = React.useState("create")
	const [editing, setEditing] = React.useState({})
	const [ingredients, setIngredients] = React.useState([])

    React.useEffect(() => {
		fetchContent(filter, page).then(setContent)
	}, [filter, page, count]);

	const onAction = (action, form) => {
		setOpen(false)

		let url = ''
		let content = {headers: {'Content-Type': 'application/json'}}

		if (mode == "create" && action == "Create") {
			url = '/api/manage/menu/create'
			content.method = 'POST'
			content.body = JSON.stringify({...form, ingredients})
		} else if (mode == "edit" && action == "Save") {  
			url = '/api/manage/menu/update'
			content.method = 'PUT'
			content.body = JSON.stringify({...editing, ...form, ingredients})
		} else if (mode == "edit" && action == "Delete") {
			url = '/api/manage/menu/remove'
			content.method = 'PUT'
			content.body = JSON.stringify({id: editing.id})
		}

		fetch(url, content).finally(() => {
			setCount(count + 1)
		})
	}

	const handleIngredients = (form) => {
		setIngredients(formatIngredients(form))
	}

    return (
        <React.Fragment>
            <StandardAppBar title="Update Menu" layout={ MANAGE_ROUTE_DRAWER_LAYOUT }/>

			<DialogForm 
				open={ open } 
				layout={ DIALOG_LAYOUT }
				onAction={ onAction }
				onClose={ () => setOpen(false) }
				initial={ mode == "edit" ? editing : CREATE_DIALOG_INITIAL }
				title={ mode == "create" ? "Create Product" : "Edit Product" }
				actions={ mode == "create" ? ["Create", "Cancel"] : ["Save", "Delete", "Cancel"] }
			>
				<IngredientTable 
					initial={ editing.ingredients } 
					onChange={ handleIngredients } 
				/>
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
								description={ "$" + row.price + " - " + row.description } 
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

export default UpdateMenu
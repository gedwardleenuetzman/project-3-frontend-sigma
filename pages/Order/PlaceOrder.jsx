import React from 'react';

import { Pagination, Grid, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'

import SearchCard from 'src/SearchCard'
import DialogForm from 'src/DialogForm'

const DIALOG_LAYOUT = [
	// { name: "server_id", type: "number" },
	// // {name: "product_details", type: "text"},
	// { name: "product_id", type: "number" },
	// { name: "product_quantity", type: "number" },
	// { name: "product_price", type: "number" },
]

const DRAWER_LAYOUT = [
	[{ text: "Home", route: "/Home" }],
	[{ text: "Order", route: "/Order" }],
	[{ text: "Manage", route: "/Manage" }],
]

const CREATE_DIALOG_INITIAL = {
	name: "Name",
	image: "URL",
	quantity: 0,
	threshold: 0
}

// const productInfo = async (filter, page) =>
// 	await (await fetch('/api/'))

const fetchContent = async (filter, page) =>
	await (await fetch(`/api/manage/menu/search?filter=${filter}&page=${page}`, { method: "GET" })).json()

const PlaceOrder = () => {
	const [page, setPage] = React.useState(1)
	const [filter, setFilter] = React.useState("")
	const [content, setContent] = React.useState({})
	const [count, setCount] = React.useState(0)

	const [open, setOpen] = React.useState(false)
	const [mode, setMode] = React.useState("create")
	const [editing, setEditing] = React.useState({})
	const [id, setId] = React.useState(-1)

	React.useEffect(() => {
		fetchContent(filter, page).then(setContent)
	}, [filter, page, count]);

	const onAction = (action, form) => {
		setOpen(false)

		let url = ''
		let content = { headers: { 'Content-Type': 'application/json' } }

		if (mode == "create" && action == "Create") {
			url = '/api/order/placeorder'
			content.method = 'POST'
			content.body = JSON.stringify({ ...form })
		}

		fetch(url, content).finally(() => {
			setCount(count + 1)
		})
	}

	return (
		<React.Fragment>
			<StandardAppBar title="Place Order" layout={DRAWER_LAYOUT} />

			<DialogForm
				open={open}
				layout={DIALOG_LAYOUT}
				onAction={onAction}
				onClose={() => setOpen(false)}
				//initial={mode == "edit" ? editing : CREATE_DIALOG_INITIAL}
				title="Place Order"
				actions={["Create", "Cancel"]}
			/>

			<Box sx={{ m: 4, display: 'flex' }}>
				<SearchBar onSearch={(val) => setFilter(val)} />
				<Button sx={{ ml: 2 }} variant="outlined" onClick={() => { setMode("create"); setOpen(true) }}>Place</Button>
			</Box>

			<Pagination
				sx={{ m: 4 }}
				variant="outlined"
				color="primary"
				count={content.pages}
				page={page}
				onChange={(event, value) => setPage(value)}
			/>

			<Box sx={{ m: 4 }}>
				<Grid container spacing={2}>
					{content.rows && content.rows.map((row, index) => (
						<Grid key={index} item xs="auto">
							<SearchCard
								name={row.name}
								image={row.image}
								description={row.quantity}
								actions={["Add"]}
								onAction={() => { setId(row.id); setOpen(true) }} // does the thing when you press add

							/>
						</Grid>
					))}
				</Grid>
			</Box>

		</React.Fragment>
	)
}

export default PlaceOrder
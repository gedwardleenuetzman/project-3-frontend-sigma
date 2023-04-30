import React from 'react';

import { Pagination, Grid, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'

import SearchCard from 'src/SearchCard'
import DialogForm from 'src/DialogForm'

const DIALOG_LAYOUT = [
	{ name: "name", type: "text" },
	{ name: "image", type: "text" },
	{ name: "threshold", type: "number" },
	{ name: "quantity", type: "number" },
]

const DRAWER_LAYOUT = [
	[{ text: "Home", route: "/Home" }],
	[{ text: "Order", route: "/Order" }, { text: "Manage", route: "/Manage" }],
	[
		{ text: "Update Inventory", route: "/Manage/UpdateInventory" },
		{ text: "Update Menu", route: "/Manage/UpdateMenu" },
		{ text: "Sales Report", route: "/Manage/SalesReport" },
		{ text: "Z Report", route: "/Manage/ZReport" },
	]
]

const CREATE_DIALOG_INITIAL = {
	name: "Name",
	image: "URL",
	quantity: 0,
	threshold: 0
}

const ZReport = () => {
	const [content, setContent] = React.useState({});

<<<<<<< HEAD
	React.useEffect(() =>{
		Zfetch();
	}, []);

	async function Zfetch() {
		const response = await fetch('/api/manage/reports/zreport/totalprice', {method: 'GET'})

		const totalprice = await response.json();

		setData(totalprice);
=======
	const Zfetch = () => {
		fetch('/api/manage/reports/zreport/zreport', { method: 'GET' })
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.error(error));
>>>>>>> 54be58f (orders show up in both tables now)
	}

	return (
		<React.Fragment>
			<StandardAppBar title="Z Report" layout={DRAWER_LAYOUT} />

<<<<<<< HEAD
            <Box sx={{ m: 4, display: 'flex' }}>
                <Button sx={{ ml: 2 }} variant="outlined" onClick={ () => { Zfetch() } }>Generate</Button>
				{response.map((item) => (
					<p>{item}</p>
				))}
            </Box>
=======
			<Box sx={{ m: 4, display: 'flex' }}>
				<Button sx={{ ml: 2 }} variant="outlined" onClick={() => { Zfetch() }}>Generate</Button>
			</Box>
>>>>>>> 54be58f (orders show up in both tables now)

			<div>
				<p>Todays sales total: $</p>
			</div>

		</React.Fragment>
	)
}

export default ZReport
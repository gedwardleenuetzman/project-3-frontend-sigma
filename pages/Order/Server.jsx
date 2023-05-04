import React from 'react';

import { Pagination, Grid, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'
import CartDrawer from 'src/CartDrawer'
import SearchCard from 'src/SearchCard'

import MANAGE_ROUTE_DRAWER_LAYOUT from 'src/DrawerLayouts/Manage'

const fetchContent = async (filter, page) =>
	await (await fetch(`/api/manage/menu/search?filter=${filter}&page=${page}`, { method: "GET" })).json()

const PlaceOrder = () => {
	const [page, setPage] = React.useState(1)
	const [filter, setFilter] = React.useState("")
	const [content, setContent] = React.useState({})

	const [order, setOrder] = React.useState([])

	const [tags, setTags] = React.useState([])

	React.useEffect(() => {
	  const fetchData = async () => {
		setTags(await (await fetch(`/api/manage/user/gettags`)).json())
	  }
  
	  fetchData()
	}, [])

	React.useEffect(() => {
		fetchContent(filter, page).then(setContent)
	}, [filter, page]);

	const addToOrder = (item) => {
		let entry = [...order]

		for (let i = 0; i < entry.length; i++) {
			if (entry[i].item.id == item.id) {
				entry[i] = {...entry[i]}
				entry[i].quantity += 1
				setOrder(entry)
				return
			}
		}

		entry.push({
			item: item,
			quantity: 1,
		})

		setOrder(entry)
	}
	
	const incrementOrder = (i) => {
		let entry = [...order]
		entry[i] = {...entry[i]}
		entry[i].quantity += 1
		setOrder(entry)
	}
	
	const decrementOrder = (i) => {
		let entry = [...order]

		if (entry[i].quantity - 1 == 0) {
			entry.splice(i, 1)
			setOrder(entry)
		} else {
			entry[i] = {...entry[i]}
			entry[i].quantity -= 1
			setOrder(entry)
		}
	}

	const formatOrder = () => {
		let entry = [...order]

		for (let i = 0; i < entry.length; i++) {
			entry[i] = {
				quantity: entry[i].quantity,
				id: entry[i].item.id,
			}
		}

		return entry
	}

	const placeOrder = async () => {
		fetch(`/api/order/serverorder`, {
			headers: {'Content-Type': 'application/json'},
			method: 'POST',
			body: JSON.stringify(formatOrder())
		})
		.then(() => {

		})
		.finally(() => {

		})

		setOrder([])
	}

	return (
		<React.Fragment>
			<StandardAppBar tags={tags} title="Serve Order" layout={MANAGE_ROUTE_DRAWER_LAYOUT}>
				<CartDrawer 
					order={ order } 
					onIncrement={incrementOrder}
					onDecrement={decrementOrder}
					onOrder={placeOrder}
				/>
			</StandardAppBar>

			<Box sx={{ m: 4, display: 'flex' }}>
				<SearchBar onSearch={(val) => setFilter(val)} />
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
                                description={"$" + row.price + " - " + row.description}
								actions={["Add"]}
								onAction={() => {
									addToOrder(row)
								}}
							/>
						</Grid>
					))}
				</Grid>
			</Box>

		</React.Fragment>
	)
}

// export async function getServerSideProps(context) {
// 	const session = await getSession(context);
  
// 	if (!session) {
// 	  return {
// 		props: {
// 		  tags: [],
// 		}
// 	  };
// 	}
  
// 	const user = await Models.Users.findOne({ where: { email: session.user.email } })
  
// 	let tags = []
  
// 	if (user.manager_permissions) {
// 	  tags.push('manage')
// 	}
  
// 	if (user.server_permissions) {
// 	  tags.push('server')
// 	}
  
// 	return {
// 	  props: {
// 		tags: tags,
// 	  },
// 	};
//   }

export default PlaceOrder
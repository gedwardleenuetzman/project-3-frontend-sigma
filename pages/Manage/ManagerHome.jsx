// Ralph Vicente 

import React from 'react';

import { Pagination, Grid, Box, Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import SearchBar from 'src/SearchBar'

import SearchCard from 'src/SearchCard'
import DialogForm from 'src/DialogForm'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
                <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                rowSpacing={1} 
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid item xs="auto">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Update Inventory
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image="/pages/Manage/box.png"
                                    alt="Update Inventory Box image"
                                />
                                <Typography variant="body2">
                                Menu to update inventory manually
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href="/Manage/UpdateInventory">Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs="auto">
                    <   Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Update Menu
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image="/pages/Manage/box.png"
                                    alt="Update Menu image"
                                />
                                <Typography variant="body2">
                                Menu to update the menu manually
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href="/Manage/UpdateMenu">Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs="auto">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Generate Z Report
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image="/pages/Manage/box.png"
                                    alt="Z Report Image"
                                />
                                <Typography variant="body2">
                                Creates Z report and makes it available for download
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs="auto" >
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Generate X Report
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image="/pages/Manage/box.png"
                                    alt="X Report Image"
                                />
                                <Typography variant="body2">
                                Create X report and makes it available for download
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs="auto" >
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Generate Excess Report
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image="/pages/Manage/box.png"
                                    alt="Excess Report Image"
                                />
                                <Typography variant="body2">
                                Create excess report and makes it available for download
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" href="/Manage/ExcessReport">Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs="auto" >
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Generate Sales Report
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image="/pages/Manage/box.png"
                                    alt="Sales Report Image"
                                />
                                <Typography variant="body2">
                                Create sales report for specific items between dates
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Enter</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default Manage
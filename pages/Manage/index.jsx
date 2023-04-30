// Ralph Vicente 

import React from 'react';

import { Box } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import RouteDetailer from 'src/RouteDetailer'

const DRAWER_LAYOUT = [
	[{text: "Home", route: "/Home"}],
	[{text: "Order", route: "/Order"}, {text: "Manage", route: "/Manage"}],
	[  
        {text: "Menu", route: "/Manage/Menu"},
		{text: "Inventory", route: "/Manage/Inventory"}, 
		{text: "Reports", route: "/Manage/Reports"},
	]
]

const ROUTE_DETAILER_LAYOUT = [
    [
        {title: "Menu", desc: "Menu to manage menu", route: "/Manage/Menu", },
        {title: "Inventory", desc: "Menu to manage inventory", route: "/Manage/Inventory"},
        {title: "Reports", desc: "Menu to handle reports", route: "/Manage/Reports"},
    ]
]

const BUTTONS = [
    "Enter"
]

const ManageHome = () => {
    return (
        <React.Fragment>
            <StandardAppBar title="Manager" layout={ DRAWER_LAYOUT }/>

            <Box sx={{m: 4}}>

            </Box>
        </React.Fragment>
    )
}

export default ManageHome
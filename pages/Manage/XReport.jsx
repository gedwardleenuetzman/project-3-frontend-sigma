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

const XReport = () => {

    const Xfetch = () => {
        fetch('/api/manage/reports/zreport/zreport', { method: 'GET' })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return (
        <React.Fragment>
            <StandardAppBar title="X Report" layout={DRAWER_LAYOUT} />

            <Box sx={{ m: 4, display: 'flex' }}>
                <Button sx={{ ml: 2 }} variant="outlined" onClick={() => { Xfetch() }}>Generate</Button>
            </Box>

        </React.Fragment>
    )
}

export default XReport
import React from 'react';

import { Box } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import RouteDetailer from 'src/RouteDetailer'

import MANAGE_ROUTE_DRAWER_LAYOUT from 'src/DrawerLayouts/Manage'

const Manage = () => {
    return (
        <React.Fragment>
            <StandardAppBar title="Manage" layout={MANAGE_ROUTE_DRAWER_LAYOUT}/>

            <Box sx={{m: 4}}>
                <RouteDetailer layout={[
                    {  
                        title: "Menu", 
                        desc: "Manage menu by adding products.", 
                        route: "/Manage/Menu", 
                        image: ""
                    },
                    {
                        title: "Inventory", 
                        desc: "Manage inventory by adding creating and restocking ingredients.", 
                        route: "/Manage/Inventory", 
                        image: ""
                    },
                    {
                        title: "Reports", 
                        desc: "Manage and generate reports", 
                        route: "/Manage/Reports", 
                        image: ""
                    }
                ]}/>
            </Box>
        </React.Fragment>
    )
}

export default Manage
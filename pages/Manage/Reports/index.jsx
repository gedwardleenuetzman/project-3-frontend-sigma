import React from 'react';

import { Box } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import RouteDetailer from 'src/RouteDetailer'

import MANAGE_REPORTS_ROUTE_DRAWER_LAYOUT from 'src/DrawerLayouts/Reports'

const Reports = () => {
    return (
        <React.Fragment>
            <StandardAppBar title="Reports" layout={MANAGE_REPORTS_ROUTE_DRAWER_LAYOUT}/>

            <Box sx={{m: 4}}>
                <RouteDetailer layout={[
                    {  
                        title: "Excess Reports", 
                        desc: "View and create excess reports", 
                        route: "/Manage/Reports/ExcessReports", 
                        image: ""
                    },
                    {  
                        title: "Z Reports", 
                        desc: "View and create Z reports", 
                        route: "/Manage/Reports/ZReports", 
                        image: ""
                    },
                    {  
                        title: "X Reports", 
                        desc: "View and create X reports", 
                        route: "/Manage/Reports/XReports", 
                        image: ""
                    },
                    {  
                        title: "Sales Reports", 
                        desc: "View and create sales reports", 
                        route: "/Manage/Reports/SalesReports", 
                        image: ""
                    },
                ]}/>
            </Box>
        </React.Fragment>
    )
}

export default Reports
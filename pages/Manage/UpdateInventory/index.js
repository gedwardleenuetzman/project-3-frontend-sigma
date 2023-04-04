import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import AccountMenu from 'src/AccountMenu';
import RouteDrawer from 'src/RouteDrawer'

export default function UpdateInventory() {
    const { data: session, status } = useSession()

    // will have map displaying Chick Fil A locations,
    // will have sign in button or avatar button with drop down to navigate

    // avatar with dropdown will be on all pages, dropdown menu will have Home, Order, and Manage options
    
    return (
        <React.Fragment>
            <AccountMenu></AccountMenu>
            <RouteDrawer layout={[
                [{text: "Home", route: "/Home"}],
                [{text: "Order", route: "/Order"}, {text: "Manage", route: "/Manage"}],
                [  
                    {text: "Update Inventory", route: "/Manage/UpdateInventory"}, 
                    {text: "Update Menu", route: "/Manage/UpdateMenu"},
                    {text: "Sales Report", route: "/Manage/SalesReport"},
                ]
            ]}>
            </RouteDrawer>
        </React.Fragment>
    );
}
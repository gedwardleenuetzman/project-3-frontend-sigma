import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import AccountMenu from 'src/AccountMenu';
import RouteDrawer from 'src/RouteDrawer'

export default function Order() {
    const { data: session, status } = useSession()

    return (

        <React.Fragment>
            <AccountMenu></AccountMenu>
            <RouteDrawer layout={[
                [{ text: "Home", route: "/Home" }],
                [{ text: "Order", route: "/Order" }],
                [
                    { text: "Checkout", route: "/Order/Checkout" }
                ],
                [{ text: "Manage", route: "/Manage" }],

            ]}>
            </RouteDrawer>
        </React.Fragment>
    );
}
/*global google*/
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import AccountMenu from '../src/AccountMenu';
import RouteDrawer from '../src/RouteDrawer'

export default function Home() {
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
            ]}>
            </RouteDrawer>
            {/* <div id="google_translate_element"></div>
            <script type="text/javascript">
                function googleTranslateElementInit() {
                new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element')
                }
            </script>
            <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script> */}
        </React.Fragment>
    );

}
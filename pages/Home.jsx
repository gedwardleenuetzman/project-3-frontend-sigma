import React, { useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import AccountMenu from '../src/AccountMenu';
import RouteDrawer from '../src/RouteDrawer';
import styles from '../src/styles/home.module.css'
import '../src/styles/home.module.css';



const bodyStyle = {
    padding: 10,
}

// Test comment

export default function Home() {
    const { data: session, status } = useSession()

    useEffect(() => {
        // Load the Google Translate API script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    
        // Define the `googleTranslateElementInit` function
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        };
      }, []);

    // will have map displaying Chick Fil A locations,
    // will have sign in button or avatar button with drop down to navigate

    // avatar with dropdown will be on all pages, dropdown menu will have Home, Order, and Manage options

    return (
        <React.Fragment>
            <AccountMenu></AccountMenu>
            <RouteDrawer layout={[
                [{ text: "Home", route: "/Home" }],

                [{ text: "Customer Ordering", route: "/CustomerOrder/CustomerOrder" }, { text: "Order", route: "/Order" }, { text: "Manage", route: "/Manage" }],
            ]}>
            </RouteDrawer>

        <div>
        <div id="google_translate_element"></div>
        </div>

            <div className="home-page">
                <div className="logo">
                    <p align="center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Chick-fil-A_Logo.svg" />
                    </p>

                </div>

                <div style={bodyStyle}>
                    <h1 align="center">Welcome to Chick-Fil-A!</h1>
                    <p align="center">Atlanta-based Chick-fil-A, Inc. is a family owned and privately held restaurant company founded in 1964 by S. Truett Cathy. Devoted to serving the local communities in which its franchised restaurants operate, and known for its original chicken sandwich, Chick-fil-A serves freshly prepared food.</p>
                    <p align="center">Visit us today at one of our many locations, and enjoy a tasty meal that will leave you satisfied and wanting more!</p>
                </div>
                <div className="map">
                    <p align="center">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d54925.97740322061!2d-96.38542732064194!3d30.63752001205226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1schick%20fil%20a!5e0!3m2!1sen!2sus!4v1682797802748!5m2!1sen!2sus"
                            width="600"
                            height="450"
                            style={{ border: "0", borderRadius: "1%" }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">

                        </iframe>
                    </p>


                </div>
            </div >
        </React.Fragment >
    );
}
import React from 'react';

import { Button } from '@mui/material'

import StandardAppBar from 'src/StandardAppBar'
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

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
        {text: "Z Report", route: "/Manage/ZReport"},
	]
]

// Define the fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Define a styled component for the box that uses the fade-in animation
const FadeInBox = styled(Box)`
  animation: ${fadeIn} 1s ease-in-out;
`;

	
const ZReport = () => {
	const [content, setContent] = React.useState(0);

	async function Zfetch() {
		try{
			const response = await fetch('/api/manage/reports/zreport/totalprice', {method: 'GET'})
			const data = await response.json();
			setContent(data);
			console.log(data);
		}
		catch(error){
			console.error(error);
		}
	}

    return (
        <React.Fragment>
            <StandardAppBar title="Z Report" layout={ DRAWER_LAYOUT }/>

            <Box sx={{ m: 4, display: 'flex' }}>
                <Button sx={{ ml: 2 }} variant="outlined" onClick={ () => { Zfetch() } }>Generate</Button>
            </Box>

			{showBox && (
				<FadeInBox sx={{ m: 2 }}>
					<Typography variant="h5" component="h1">
						The total for this Z reports sales is : {content}.
					</Typography>
				</FadeInBox>
			)}

        </React.Fragment>
    )
}

export default ZReport
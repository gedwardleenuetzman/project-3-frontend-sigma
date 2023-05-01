import React from 'react';
import { Button, withTheme } from '@mui/material'
import StandardAppBar from 'src/StandardAppBar'
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const styles = {
	dropdown: {
		border: 'none',
		background: 'inherit',
		color: 'white',
		size: 'auto',
		padding: '10px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '16px',
		'&:before': { borderBottom: 'none' },
		'&:after': { borderBottom: 'none' },
		'&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
		'&.Mui-focused:before': { borderBottom: 'none' },
		textAlign: 'center',
		webkitAlign: 'center',
		// appearance: 'none',
	},

	option: {
		background: '#303030',
		color: 'white',
		fontSize: '10px',
		MozAppearance: 'none',
	}
}

const DRAWER_LAYOUT = [
	[{ text: "Home", route: "/Home" }],
	[{ text: "Customer Order", route: "/CustomerOrder/CustomerOrder" }],
	[{ text: "Order", route: "/Order" },
	{ text: "Manage", route: "/Manage" }],
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

const DropdownMenu = () => {
	const [selected, setSelected] = React.useState('ZReport');

	const handleSelect = (event) => {
		setSelected(event.target.value);
	};

	return (
		<React.Fragment>
			<StandardAppBar title="Z Report" layout={DRAWER_LAYOUT} />

			<div>
				<div style={{ padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

					<select value={selected} onChange={handleSelect} style={styles.dropdown}>
						<option value="XZReport" style={styles.option}>Z Report and X Report</option>
						<option value="block2" style={styles.option}>Excess Report</option>
						<option value="block3" style={styles.option}>Sales Report</option>
					</select>
				</div>

				{selected === 'ZReport' && <XZReport />}
				{selected === 'block2' && <ExcessReport />}
				{selected === 'block3' && <Block3 />}
			</div>

		</React.Fragment>
	);
}

const XZReport = () => {
	const [content, setContent] = React.useState(0);
	const [zshowBox, setZShowBox] = React.useState(false);
	const [znullBox, setZNullBox] = React.useState(false);
	const [xshowBox, setXShowBox] = React.useState(false);
	const [xnullBox, setXNullBox] = React.useState(false);

	async function Zfetch() {
		try {
			const response = await fetch('/api/manage/reports/zreport/totalprice', { method: 'GET' })
			const data = await response.json();
			setContent(data);
			console.log(data);
		}
		catch (error) {
			console.error(error);
		}

		if (content) {
			setZShowBox(true);
			setZNullBox(false);
		}
		else {
			setZNullBox(true);
			setZShowBox(false);
		}
	}

	async function Xfetch() {
		try {
			const response = await fetch('/api/manage/reports/xreport/totalprice', { method: 'GET' })
			const data = await response.json();
			setContent(data);
			console.log(data);
		}
		catch (error) {
			console.error(error);
		}

		if (content) {
			setXShowBox(true);
			setXNullBox(false);
		}
		else {
			setXNullBox(true);
			setXShowBox(false);
		}
	}

	return (
		<React.Fragment>
			<FadeInBox sx={{ m: 2 }}>
				<StandardAppBar title="Z Report" layout={DRAWER_LAYOUT} />

				<Typography variant="h5" component="h1">
					Z Report Generation:
				</Typography>
				<Box sx={{ m: 4, display: 'flex' }}>
					<Button sx={{ ml: 2 }} variant="outlined" onClick={() => { Zfetch() }}>Generate</Button>
				</Box>

				{zshowBox && (
					<FadeInBox sx={{ m: 2 }}>
						<Typography variant="h5" component="h1">
							The total for this Z reports sales is : {content}.
						</Typography>
					</FadeInBox>
				)}

				{znullBox && (
					<FadeInBox sx={{ m: 2 }}>
						<Typography variant="h5" component="h1">
							Error in displaying the Z report, value is most likely NULL.
						</Typography>
					</FadeInBox>
				)}

				<Typography variant="h5" component="h1">
					X Report Generation:
				</Typography>
				<Box sx={{ m: 4, display: 'flex' }}>
					<Button sx={{ ml: 2 }} variant="outlined" onClick={() => { Xfetch() }}>Generate</Button>
				</Box>

				{xshowBox && (
					<FadeInBox sx={{ m: 2 }}>
						<Typography variant="h5" component="h1">
							The total for this X reports sales is : {content}.
						</Typography>
					</FadeInBox>
				)}

				{xnullBox && (
					<FadeInBox sx={{ m: 2 }}>
						<Typography variant="h5" component="h1">
							Error in displaying the X report, value is most likely NULL.
						</Typography>
					</FadeInBox>
				)}
			</FadeInBox>

		</React.Fragment>
	)
}



export default DropdownMenu
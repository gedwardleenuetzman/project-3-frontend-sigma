import React from 'react';
import { Button, withTheme } from '@mui/material'
import StandardAppBar from 'src/StandardAppBar'
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useState, useEffect } from "react";

const styles = {
	dropdown:{
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
		WebkitAlign: 'center',
		// appearance: 'none',
	},

	option:{
		background: '#303030',
		color: 'white',
		fontSize: '10px',
		MozAppearance: 'none',
	}
}

const DRAWER_LAYOUT = [
	[{text: "Home", route: "/Home"}],
	[{text: "Order", route: "/Order"}, {text: "Manage", route: "/Manage"}],
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
	const [selected, setSelected] = React.useState('XZReport');

	const handleSelect = (event) => {
		setSelected(event.target.value);
	};

	return (
		<React.Fragment>
			<StandardAppBar title="Manager Reports" layout={ DRAWER_LAYOUT }/>
			
      		<div>
				<div style={{ padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				
				<select value={selected} onChange={handleSelect} style={styles.dropdown}>
					<option value="XZReport" style={styles.option}>Z Report and X Report</option>
					<option value="ExcessReport" style={styles.option}>Excess Report</option>
					<option value="block3" style={styles.option}>Sales Report</option>
				</select>
				</div>
	
				{selected === 'XZReport' && <XZReport/>}
				{selected === 'ExcessReport' && <ExcessReport />}
				{selected === 'block3' && <Block3 />}
			</div>

		</React.Fragment>
	  );
}
	
const XZReport = () => {
	const [zcontent, setZContent] = React.useState(0);
	const [xcontent, setXContent] = React.useState(0);
	const [zshowBox, setZShowBox] = React.useState(false);
	const [znullBox, setZNullBox] = React.useState(false);
	const [xshowBox, setXShowBox] = React.useState(false);
	const [xnullBox, setXNullBox] = React.useState(false);

	async function Zfetch() {
		setZShowBox(false);
		setZNullBox(false);

		try{
			const response = await fetch('/api/manage/reports/zreport/totalprice', {method: 'GET'})
			const data = await response.json();
			setZContent(data);
			console.log(data);
		}
		catch(error){
			console.error(error);
		}

		if(zcontent){
			setZShowBox(true);
		}
		else{
			setZNullBox(true);
		}
	}

	async function Xfetch() {
		setXShowBox(false);
		setXNullBox(false);

		try{
			const response = await fetch('/api/manage/reports/xreport/totalprice', {method: 'GET'})
			const data = await response.json();
			setXContent(data);
			console.log(data);
		}
		catch(error){
			console.error(error);
		}

		if(xcontent){
			setXShowBox(true);
		}
		else{
			setXNullBox(true);
		}
	}

    return (
        <React.Fragment>
			<FadeInBox sx={{ m: 2 }}>
			
			<Typography variant="h5" component="h1">
					Z Report Generation:
			</Typography>
            <Box sx={{ m: 4, display: 'flex'}}>
                <Button sx={{ ml: 2 }} variant="outlined" onClick={ () => { Zfetch() } }>Generate</Button>
            </Box>

			{zshowBox && (
				<FadeInBox sx={{ m: 2 }}>
					<Typography variant="h5" component="h1">
						The total for this Z reports sales is : ${zcontent}
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
            <Box sx={{ m: 4, display: 'flex'}}>
                <Button sx={{ ml: 2 }} variant="outlined" onClick={ () => { Xfetch() } }>Generate</Button>
            </Box>

			{xshowBox && (
				<FadeInBox sx={{ m: 2 }}>
					<Typography variant="h5" component="h1">
						The total for this X reports sales is : ${xcontent}
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

const ExcessReport = () => {
	const [startDate, setStartDate] = useState("2023-04-18");
	const [endDate, setEndDate] = useState("2023-05-09");
	const [excessData, setExcessData] = useState(['']);
	const [isGenerated, setIsGenerated] = useState(false);

	const handleGenerateClick = () => {
		setIsGenerated(true);
	};

	const printExcessData = () => {
		console.log(JSON.stringify(excessData));
	};

	useEffect(() => {
		if (isGenerated) {
			async function fetchExcessReport() {
			try {
				const response = await fetch(`/api/manage/reports/excessreport/inventorysold?start=${startDate}&end=${endDate}`, {method: 'GET'});
				const data = await response.json();
				setExcessData(data);
			} catch (error) {
				console.error(error);
			}
			}

			fetchExcessReport();
		}
	}, [isGenerated, startDate, endDate]);

	const handleStartDateChange = (event) => {
		setStartDate(event.target.value);
		console.log("Start Date", event.target.value);
	};

	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
		console.log("End Date", event.target.value);
	};

	return (
		<div>
		<h2>Excess Report</h2>
		<div>
			<label htmlFor="startDate">Start Date:</label>
			<input type="date" id="startDate" name="startDate" value={startDate} onChange={handleStartDateChange} />
		</div>
		<div>
			<label htmlFor="endDate">End Date:</label>
			<input type="date" id="endDate" name="endDate" value={endDate} onChange={handleEndDateChange} />
		</div>
		<ul>
		<Button sx={{ ml: 2 }} variant="outlined" onClick={handleGenerateClick}>Generate</Button>
		<Button sx={{ ml: 2 }} variant="outlined" onClick={printExcessData}>Print Data</Button>
		</ul>
		
		{isGenerated && (
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Excess Percentage</th>
            </tr>	
          </thead>
          <tbody>
        	{excessData.map(
              (item) =>
                item.excessPercentage < 10 && (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.excessPercentage}%</td>
                  </tr>
                )
            )
			}
          </tbody>
        </table>
      )}
	  </div>
	);
}

export default DropdownMenu
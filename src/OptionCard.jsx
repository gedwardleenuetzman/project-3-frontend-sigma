import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OptionCard({desc, buttons, onClick}) {
	const handleClick = (action) => {
		onClick(action)
	}

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{ title }
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{ desc }
				</Typography>
			</CardContent>

			<CardActions>
				{buttons.map((action) => (
					<Button onClick={handleClick(action)} size="small">{ action }</Button>
				))}
			</CardActions>
		</Card>
	);
}
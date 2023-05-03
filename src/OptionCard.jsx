import * as React from 'react';

import { Card, CardActions, CardContent, Button, Typography, CardMedia, Paper } from '@mui/material'

export default function OptionCard({desc, title, image, children, onClick}) {
	const handleClick = (action) => {
		if (onClick) {
			onClick(action)
		}
	}

	return (
		<Card sx={{ maxWidth: 345 }}>
			{image && 
				<Paper elevation={3}>
					<CardMedia
						component="img"
						alt="green iguana"
						height="140"
						image={ image }
						sx={{p: 1}}
						style={{ objectFit: "contain" }}
					/>
				</Paper>
			}
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{ title }
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{ desc }
				</Typography>
			</CardContent>

			<CardActions>
				{ children }
			</CardActions>
		</Card>
	);
}
import * as React from 'react';

import { Card, CardActions, CardContent, Button, Typography, CardMedia } from '@mui/material'

/**
 * 
 * @param {*} desc
 * @param {*} title
 * @param {*} image
 * @param {*} children
 * @param {*} onClick
 * 
 * @returns Provides different option based on the click
 */
export default function OptionCard({desc, title, image, children, onClick}) {
	const handleClick = (action) => {
		if (onClick) {
			onClick(action)
		}
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
				{ children }
			</CardActions>
		</Card>
	);
}
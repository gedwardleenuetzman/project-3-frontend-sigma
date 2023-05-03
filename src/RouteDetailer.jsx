import * as React from 'react'

import { Grid, Button } from '@mui/material'

import OptionCard from 'src/OptionCard'

/**
 * 
 * @param {*} props 
 * @returns Details the routes that the query selects
 */
export default function RouteDetailer(props) {
	return (
		<Grid
			container
			direction="row"
			rowSpacing={1}
			columnSpacing={{ xs: 1, sm: 2, md: 3 }}
		>
			{props.layout.map((item, index) => (
				<Grid key={index} item xs="auto">
					<OptionCard
						image={item.image}
						title={item.title}
						desc={item.desc}
					>
						<Button href={item.route} size="small">Enter</Button>
					</OptionCard>
				</Grid>
			))}
		</Grid>
	)
}
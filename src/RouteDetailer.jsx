import * as React from 'react'

import { Grid } from '@mui/material'

import { useRouter } from 'next/router'

import OptionCard from 'src/OptionCard'

export default function TemporaryDrawer(props) {
    const router = useRouter()

    const clicked = (route) => () => {
        router.push(route)
    }

    return (
		<Grid 
			container
			direction="row"
			justifyContent="space-evenly"
			alignItems="center"
			rowSpacing={1} 
			columnSpacing={{ xs: 1, sm: 2, md: 3 }}
		>
			{props.layout.map((item, index) => (
				<Grid key={index} item xs="auto">
					<OptionCard 
						buttons={["Enter"]}
						title={item.title} 
						desc={item.desc} 
						onClick={clicked(item.route)}>
					</OptionCard>
				</Grid>
			))}
		</Grid>
    )
}

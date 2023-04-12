import * as React from 'react';

import { Box, Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material'

import IngredientDialog from './IngredientDialog'

export default function SearchCard(props) {
  return (
    <Card sx={{ display: 'flex' }} >

      <CardMedia component="img" sx={{ width: 150, height: 150 }} image={ props.image }/>

      <Box sx={{ width: 300, height: 150 }}>

        <CardContent sx={{ height: 95 }}>
          <Typography variant="h6" component="div"> { props.name } </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"> { props.description } </Typography>
        </CardContent>

        <CardActions sx={{ ml: 1 }}>
          <Button variant="contained" size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>

      </Box>
      
    </Card>
  )
}
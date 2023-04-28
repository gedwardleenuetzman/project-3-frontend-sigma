import * as React from 'react';

import { Box, Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material'

export default function SearchCard({ name, description, image, actions, onAction }) {
  const handleAction = (action) => {
    return () => {
      onAction(action)
    }
  }

  return (
    <Card sx={{ display: 'flex' }} >

      {image && (
        <CardMedia component="img" sx={{ width: 150, height: 150 }} image={image} />
      )}

      <Box sx={{ width: 300, height: 150 }}>

        <CardContent sx={{ height: 95 }}>
<<<<<<< HEAD
          <Typography variant="h6" component="div"> {name} </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary"> {description} </Typography>
=======
          <Typography variant="h6" component="div"> { name } </Typography>
          <Typography sx={{ overflow: "hidden", height: 50 }} color="text.secondary"> { description } </Typography>
>>>>>>> main
        </CardContent>

        <CardActions sx={{ ml: 1 }}>
          {actions.map((action, i) =>
            <Button key={i} size="small" variant="contained" onClick={handleAction(action)}>{action}</Button>
          )}
        </CardActions>

      </Box>

    </Card>
  )
}
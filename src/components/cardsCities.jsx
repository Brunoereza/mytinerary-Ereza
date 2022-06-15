import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './styles/Cities.css'
import { Link as LinkRouter } from 'react-router-dom'
// import  Data from './data'


export default function cardsCities({ cardFilter }) {
  return (
    cardFilter.map(city => {
      return (
        <Card sx={{ maxWidth: 345 }} key={city.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={city.image}
              alt={city.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {city.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {city.country}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <LinkRouter to={`/cities/details/${city.id}`}>
              <Button size="small" color="primary">
                View more
              </Button>
            </LinkRouter>
          </CardActions>
        </Card>
      )
    }
    )
  );
}




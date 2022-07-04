import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './styles/Cities.css'
import { Link as LinkRouter } from 'react-router-dom'
import { useSelector } from "react-redux";
import NotResults from './NotResults';


export default function cardsCities() {

  const cardFilter = useSelector(store => store.citiesReducer.filter)
  console.log(cardFilter)
  return (
    <>
      <div className='conteiner'>

      
      <div className="conteiner-cards">


        {cardFilter.lenght > 0 ? cardFilter.map(city => (
          <Card className='cards' sx={{ maxWidth: 345 }} key={city._id}>
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
              <LinkRouter to={`/cities/details/${city._id}`}>
                <Button size="small" color="primary">
                  View more
                </Button>
              </LinkRouter>
            </CardActions>
          </Card>
        )
        ): <NotResults/>
        }
      </div>
      </div>

    </>


  );
}




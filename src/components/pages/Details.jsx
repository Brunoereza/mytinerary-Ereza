import React from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Data from '../data'
import '../styles/Details.css'


function Details() {
  const { id } = useParams()
  let cardsDitails = Data.find(city => city.id === (id))
  // console.log(cardsDitails)
  return (
    <div className="conteiner-card-details">
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cardsDitails.image}
          alt={cardsDitails.name}
        />
        <CardContent>
          <Typography>
            {cardsDitails.name}
          </Typography>
          <Typography>
            {cardsDitails.country}
          </Typography>
          <Typography>
            Detalle
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>

  )
}
export default Details




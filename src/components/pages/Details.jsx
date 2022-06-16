import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios'
import '../styles/Details.css'


function Details() {


  const { id } = useParams()


  const [cities, setCities] = useState([])

  useEffect(()=>{
      axios.get("http://localhost:4000/api/cities")
      .then(response=> 
        {
          setCities(response.data.response.cities)
          console.log(response)
        })
  },[])
  let cardsDitails = cities.find(city => city._id === (id))
  console.log(cities)
  console.log(cardsDitails)

  // console.log(cardsDitails)
  return (
    <div className="conteiner-card-details">
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={cardsDitails?.image}
          alt={cardsDitails?.name}
        />
        <CardContent>
          <Typography>
            {cardsDitails?.name}
          </Typography>
          <Typography>
            {cardsDitails?.country}
          </Typography>
          <Typography>
            {cardsDitails?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>

  )
}
export default Details




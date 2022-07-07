import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../styles/Details.css';
import {useDispatch, useSelector} from 'react-redux';
import citiesActions from '../../redux/actions/citiesActions';
import intinerariesActions from "../../redux/actions/intinerariesActions";
import Intinerary from "../Intinerary";


function Details() {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(citiesActions.getOneCity(id))
      // eslint-disable-next-line
  },[])
  useEffect(()=>{
    dispatch(intinerariesActions.getItineraryByCity(id))
    // eslint-disable-next-line
},[])
  let cardsDitails = useSelector(state=>state.citiesReducer.oneCity)
  let intineraries = useSelector(state=>state.intinerariesReducer.intineraries)
  
 
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
    <div className="conteiner-itinerary">
      {intineraries.length > 0 ? intineraries.map(intinerary => <Intinerary key={intinerary._id} data={intinerary}/>) : <Typography sx={{fontSize:"2rem",margin:"5rem"}}>NO ITINERARIES YET!</Typography>}
    </div>
    </div>
  )
}
export default Details




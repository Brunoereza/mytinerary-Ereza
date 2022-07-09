import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Activities from './Activities';
import { useSelector, useDispatch } from 'react-redux';
import intinerariesActions from '../redux/actions/intinerariesActions';


const ExpandMore = styled((props) => {
   const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Intinerary({data}) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()
  const [reload,setReload] = useState(false)
  const userLogin = useSelector(store => store.usersReducers.user)
  console.log(userLogin)
  const handleExpandClick = () => {
  setExpanded(!expanded);
  };
  async function likeOrDislikes(event) {
    await dispatch(intinerariesActions.likeDislike(event.target.id))//con el dispatch traigo la accion de likeOrDislikes de mis actions, escucha el event.target.id al dar click
    setReload(!reload)
}

console.log(data.likes)
  return (



    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
             <img src={data.imagePublisher} className="avatar" alt='avatar' />
           
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {data.publisher}
        
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {data.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.duration}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.hashtags}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* {userLogin?       
          ({data.likes.includes(userLogin?.user.id)?
          <FavoriteIcon sx={{color:'red'}} />       
        :       
           <FavoriteBorderIcon />})                        
        :        
        (<FavoriteBorderIcon />
        )} */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Activities activities = {data.activities} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

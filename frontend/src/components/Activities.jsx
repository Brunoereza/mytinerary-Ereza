import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';




export default function Activities({activities}) {
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      {activities?.length > 0 ? activities.map(a=>{
        return(
          <CardActionArea key={a._id}>
         <CardMedia
           component="img"
           height="140"
           image={a.imgActivity}
           alt="green iguana"
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
             {a.nameActivity}
           </Typography>

         </CardContent>
       </CardActionArea>
        )
         
      }): <Typography sx={{fontSize:"2rem",margin:"5rem"}}>NO ACTIVITIES YET!</Typography>

      }
     
    </Card>
  );
}

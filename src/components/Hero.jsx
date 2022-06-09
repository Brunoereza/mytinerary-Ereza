import React from "react";
import './styles/Hero.css';
import {Link as LinkRouter} from 'react-router-dom'




function Hero() {
    return(
        <>
        <div className="container-text-button">
           <div className="text-button">
               <h3>Are you looking for where to travel? or where to make your honeymoon? I invite you to press this button and know the answers to those questions</h3>
               <LinkRouter to='/Cities'>     
              <button className="button-hero"> Hover me
              </button>
           </LinkRouter>
           </div>
        


        </div>
        </>
    );
}

export default Hero


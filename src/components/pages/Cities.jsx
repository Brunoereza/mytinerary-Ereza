import React from "react";
import {Link as LinkRouter} from 'react-router-dom'
import '../styles/Cities.css'


function Cities() {
    return(

         <div className="Background-cities">
             <h5>Page not found</h5>
             <p>we are working to give you a better experience, thank you for your understanding</p>
             <LinkRouter to={'/'} className='linkHome'>Return to Home</LinkRouter>
         </div>
    );
}

export default Cities






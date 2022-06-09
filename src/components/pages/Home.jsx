import React from "react";
import Hero from "../Hero";
import Carrusel from "../carrousel";
import '../styles/Home.css';


function Home () {
    return(
  
        <div className="Background">
          <Hero />
          <Carrusel />
          <div>
                 <div className='conteiner-title'>
                    <h1>My Tinerary</h1>
                 </div>
            </div>
        </div>
    )
}
export default Home


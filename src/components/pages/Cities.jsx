import React, { useEffect, useState } from "react";
// import '../styles/Cities.css'
import Cards from '../cardsCities'
// import Data from '../data'
import NotResults from "../NotResults";
import axios from 'axios'
// import { search } from "../../../../routes/routes";





function Cities() {
    const [cityFilter, setCityFilter]= useState()
    const [inputValue, setInputValue]= useState ("")

     const [cities, setCities] = useState()

     useEffect(()=>{
         axios.get("http://localhost:4000/api/cities")
         .then(response=> setCities(response.data.response.cities))
     },[])

     useEffect(() =>{
        let cityFil = cities?.filter(city=> city.name.toLowerCase().startsWith(inputValue.trim().toLowerCase()))
        setCityFilter(cityFil)
     },[inputValue, cities])

    // let filterInput = city.filter((city)=> {
    // return city.name.toLowerCase().startsWith(inputValue.toLowerCase().trim())
    
    //    }
    // )
    
    return(
        <>
          <div className="inputText">
              <input onKeyUp={(e)=>{setInputValue(e.target.value)}} type="text" title="serch"></input>
          </div>
          <div>
              {cityFilter?.length > 0 ? (<Cards cardFilter={cityFilter}/>): (<NotResults/>)}
          </div>
        </>
    );
}

export default Cities






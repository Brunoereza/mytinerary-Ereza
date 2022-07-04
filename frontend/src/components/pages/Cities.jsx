import React, { useEffect, useState } from "react";
import Cards from '../cardsCities'
import NotResults from "../NotResults";
import {connect} from "react-redux"





function Cities(props) {

    const [inputValue, setInputValue]= useState ("")


    let cityFil = props.cities?.filter(city=> city.name.toLowerCase().startsWith(inputValue.trim().toLowerCase()))

    
    return(
        <>
         <div className="inputText">
         <input onKeyUp={(e)=>{setInputValue(e.target.value)}} type="text" className="input" title="serch"></input>
         </div>
         
          <div>
              {cityFil?.length > 0 ? (<Cards cardFilter={cityFil}/>): (<NotResults/>)}
          </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return{
        cities: state.citiesReducer.cities, 
        auxiliar: state.citiesReducer.auxiliar,
    }
}

export default connect(mapStateToProps, null)(Cities)











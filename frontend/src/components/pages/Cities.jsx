import React from "react";
import Cards from '../cardsCities'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import citiesActions from "../../redux/actions/citiesActions";




function Cities() {

    const [filter, setFilter] = useState('') 
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(citiesActions.filterCities(filter))
        // eslint-disable-next-line
    },[filter])
console.log(filter)
    return(
        <>
        <div className="inputText">
          <input type="text" name="text" className="input" placeholder="Type something here...." onKeyUp={(e) =>{setFilter(e.target.value)}} />
        </div>
          <div>
              <Cards/>
          </div>
        </>
    );
}


export default Cities






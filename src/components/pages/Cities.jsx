import React, { useState } from "react";
import '../styles/Cities.css'
import Cards from '../cardsCities'
import Data from '../data'
import NotResults from "../NotResults";




function Cities() {
    const [inputValue, setInputValue]= useState ("")
console.log(Data)
    let filterInput = Data.filter((city)=> {
    return city.name.toLowerCase().startsWith(inputValue.toLowerCase().trim())
    
       }
    )
    console.log(filterInput)
    return(
        <>
          <div className="inputText">
              <input onKeyUp={(e)=>{setInputValue(e.target.value)}} type="text" title="serch"></input>
          </div>
          <div>
              {filterInput.length > 0 ? (<Cards cardFilter={filterInput}/>): (<NotResults/>)}
          </div>
        </>
    );
}

export default Cities






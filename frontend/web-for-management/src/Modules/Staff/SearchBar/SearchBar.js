import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Logo from '../../../shared/icons/Search.png'
// import AddCategory from '../AddCategory/AddCategory';
import "./SearchBar.css"

export default function SearchBike (){
    
    return(
        <div className="Bar" >
            <div className="Bao" style={{ width: "1450px"}}>
                <FaSearch id="Search" />
                <input className="input" 
                //   value={textData} 
                //   onChange={handleChange}
                placeholder="Search here..."></input>
            </div>
        </div>
    )
}
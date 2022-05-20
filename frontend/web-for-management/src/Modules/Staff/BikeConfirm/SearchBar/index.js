import React from 'react';
import { FaSearch } from 'react-icons/fa'

function SearchBike() {
  

  return (
    <div className="Bar">
      <div className="Baoinstaff">
        <FaSearch id="Search" />
        <input className="input"
        value="Search here" 
        placeholder="Search here..."></input>
      </div>
    </div >
  )
}

export default SearchBike;

import React, { useEffect, useState } from 'react';
import './SearchBar.css'
import axios from 'axios';
import { FaTrash, FaSearch } from 'react-icons/fa'
import { Button } from "@mui/material"

function SearchBar({ list, callBack, callBackOpen, updateSearch }) {
  const [textData, setTextData] = useState('')
  const [listDelete, setListDelete] = useState([]);

  useEffect(() => {
    setListDelete(list);
  }, [list])

  const handleChange = (e) => {
    setTextData(e.target.value);
  }

  updateSearch(textData);

  return (
    <div className="Bar">
      <div className="Baoinstaff">
        <FaSearch id="Search" />
        <input className="input"
        value={textData} 
        onChange={handleChange}
        placeholder="Search here..."></input>
      </div>
    </div >
  )
}

export default SearchBar;

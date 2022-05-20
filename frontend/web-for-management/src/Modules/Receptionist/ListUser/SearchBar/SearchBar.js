import './SearchBar.css'
import React, { useEffect, useState } from 'react';
import { FaTrash, FaSearch } from 'react-icons/fa'
import { Button } from '@mui/material'
import axios from 'axios';

function SearchBar({ list, callBack, updateSearch }) {
  const [textData, setTextData] = useState('')
  const [listDelete, setListDelete] = useState([])
  const handleChange = (e) => {
    setTextData(e.target.value);
  }
  updateSearch(textData);

  async function deleteUser(id) {
    const token = localStorage.getItem("token")
    console.log(token);
    await axios.delete(`https://nmcnpm.herokuapp.com/api/v2/user/delete/` + id, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        var status = true;
      })
  }

  useEffect(() => {
    setListDelete(list);
  },[list])

  return (
    <div className="Bar">
      <div className="baobigger">
        <FaSearch id="Search" />
        <input className="input" 
          value={textData} 
          onChange={handleChange} 
          placeholder="Search here..."></input>
      </div>
      <Button id="Delete"
        onClick = { async () => {
          if (listDelete.length !== 0) {
            for (var i = 0; i< listDelete.length; i++) {
              deleteUser(listDelete[i]);
              console.log(listDelete[i]);
            }
          }
          callBack();
        }}
      >Delete<FaTrash className = "trash"/></Button>
    </div >
  )
}

export default SearchBar;
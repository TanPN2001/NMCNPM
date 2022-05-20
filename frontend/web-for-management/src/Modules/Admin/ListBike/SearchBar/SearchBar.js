import './SearchBar.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaSearch } from 'react-icons/fa'
import { Button } from "@mui/material"

function SearchBar({ list, callBack, callBackOpen, updateSearch }) {
  const [textData, setTextData] = useState('')
  const [listDelete, setListDelete] = useState([]);
  const [listUserDelete, setListUserDelete] = useState([]);

  async function deleteListUser(listDelete) {
    const token = localStorage.getItem("token")
    const result = await axios.post(`https://nmcnpm.herokuapp.com/api/v2/bike/delete`, listDelete, { headers: { "Authorization": `Bearer ${token}` } })
  }

  useEffect(() => {
    setListDelete(list);
  }, [list])

  const handleChange = (e) => {
    setTextData(e.target.value);
  }

  updateSearch(textData);

  return (
    <div className="Bar">
      <div className="Bao">
        <FaSearch id="Search" />
        <input className="input" 
          value={textData} 
          onChange={handleChange}
          placeholder="Search here..."></input>
      </div>

      <Button variant="contained" id="Delete"
        onClick={async () => {
          if (listDelete.length !== 0) {
            deleteListUser(listDelete)
          }
          callBack();
        }}
      >Delete<FaTrash className="trash" /></Button>
      <Button id="Newmember" onClick={() => {
        callBackOpen();
      }} >New bike</Button>
    </div>
  )
}

export default SearchBar;

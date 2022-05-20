import './SearchBar.css'
import React, { useState, useEffect } from 'react';
import AddAndEditEmployee from '../AddAndEditEmployee/AddAndEditEmployee';
import axios from 'axios';
import {FaSearch, FaTrash} from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import { Button } from "@mui/material"
function SearchBar({ list, callBack, role, updateSearch}) {
  const [isEditing, setEditing] = useState(false)
  const [listDelete, setListDelete] = useState([])
  const [loading, setLoading] = useState(false)
  const [textData, setTextData] = useState('')
  async function deleteMember(id) {
    const url = `https://nmcnpm.herokuapp.com/api/v1/accounts/delete?type=${(role[0]) ? "receptionist" : "staff"}/` + id
    var status = true
    const token = localStorage.getItem("token")
    await axios.delete(url, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        status = true
      }).catch(function (error) {
        status = false
      });
    return status
  }
  const handleChange = (e) => {
    setTextData(e.target.value);
  }
  updateSearch(textData);
  useEffect(() => {
    setListDelete(list)
  }, [list])
  return (
    <div>
      {
        (isEditing) &&
        <AddAndEditEmployee callBack={() => { setEditing(false); callBack() }} isAdd={true}></AddAndEditEmployee>
      }
      <div className="Bar">
        <div className="Bao">
          <FaSearch id="Search" alt="searchIcon" />
          <input className="input" type='text' 
            value={textData} 
            onChange={handleChange}
            placeholder="Search here..."></input>
        </div>
        <Button variant="contained" id="Delete" onClick={async () => {
          if (listDelete.length != 0) {
            setLoading(true)
            setListDelete(true)
            var list = []
            for (var i = 0; i < listDelete.length; i++) {
              const check = await deleteMember(listDelete[i])
              if (check != true) {
                list.push(listDelete[i])
              }
            }
            if (list.length != 0) {
              alert("Some member can't delete, please try again")
              setListDelete([])
              callBack()
            } else {
              alert("Delete successful")
              setListDelete([])
              callBack()
            }
            setLoading(false)
          }
        }
        } >
          {
            (loading) ? <PropagateLoader /> : <div>
              Delete&nbsp;&nbsp;<FaTrash id="Trash" alt="Trash icon" />
            </div>
          }
        </Button>
        <Button variant="contained" id="Newmember" onClick={() => {
          setEditing(true)
        }}>New member +</Button>
      </div >

    </div >

  );
}

export default SearchBar;

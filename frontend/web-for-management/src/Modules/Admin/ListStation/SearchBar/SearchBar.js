import './SearchBar.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaSearch } from 'react-icons/fa';
import { Button } from "@mui/material";
import { getByName } from '../../Store/ListStationStore';

export default function SearchBike ({setAddStation, setDataFiltered, setSearchInput}){
    const getData = async (name) => {
        const result = await getByName(name);
        if(result==="Failed to fetch"){
            //alert("Failed to fetch data");
            setDataFiltered([]);
        }
        else{
            setDataFiltered(result);
        }
    }
    const handleChange = (event) => {
        setSearchInput(event.target.value.toString());
        getData(event.target.value.toString());
    }
    return(
        
        <div className="Bar" >
            
            <div className="baobigger">
        <FaSearch id="Search"/>
        <input className="input" placeholder="Search here..."  onChange={handleChange}></input>
        
      </div>
        <Button id="Delete" onClick={()=>{setAddStation(true)}} >New Station</Button>
        </div>
    )
}
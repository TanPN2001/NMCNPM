import './SearchBar.css'
import React from 'react';
import Filter from '../../../../shared/icons/Vector.png'
import { FaSortAmountUp, FaSearch } from 'react-icons/fa'
import { Button } from '@mui/material'
import { useState } from 'react'
function SearchBar({ updateSearch }) {
    const [textData, setTextData] = useState('')
    const handleChange = (e) => {
        setTextData(e.target.value);
    }
    updateSearch(textData);
    return (
        <div className="Bar">
            <div className="baobigger">
                <FaSearch id="Search" alt="searchIcon" />
                <input className="input"
                    value={textData}
                    onChange={handleChange}
                    placeholder="Search here..."></input>
            </div>
            <Button id="Delete" >Filter&nbsp;<FaSortAmountUp className="Filter" src={Filter} /></Button>
        </div >
    );
}

export default SearchBar;

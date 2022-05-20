import './SearchBar.css'
import React, { useEffect, useState } from 'react';
import Logo from "frontend/web-for-management/src/shared/icons/Search.png"
import Filter from 'frontend/web-for-management/src/shared/icons/Vector.png'

function SearchBar() {

  return (
    <div className="Bar1">
      <div className="SearchBar">
        <img className="Search" src={Logo}></img>
        <input className="input" placeholder="Search here..."></input>
      </div>
      <a className="button11" href="#">Filter<img className="Filter" src={Filter}></img></a>
    </div >
  );
}

export default SearchBar;

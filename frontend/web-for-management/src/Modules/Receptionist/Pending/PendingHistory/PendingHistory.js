import './PendingHistory.css'
import React from 'react';
import Content from '../Content/Content';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react'
function PendingHistory() {
    const [search, setSearch] = useState('');
    return (
        <div className="PendingHis">
            <SearchBar
                updateSearch = {(search) => setSearch(search)}
            ></SearchBar>
            <Content
                search = {search}
            ></Content>
        </div>
    );
}

export default PendingHistory;

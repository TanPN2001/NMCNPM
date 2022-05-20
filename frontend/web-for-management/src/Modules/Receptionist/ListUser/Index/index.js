import './index.css'
import React, { useState } from 'react';
import UserTable from '../UserTable/UserTable';
import SearchBar from '../SearchBar/SearchBar';

function ListUser() {
    const [loading, setLoading] = useState(false)
    const [listIdDelete, setListId] = useState([])
    const [search, setSearch] = useState('');
    return (
        <div className="ListUser">
            <SearchBar list={listIdDelete} 
                callBack={() => {
                    setListId([])
                    setLoading(!loading)
                }}
                updateSearch = {(search) => setSearch(search)}
            ></SearchBar>
            <UserTable 
                search = {search}
                loading = {loading}
                updateList={(list) => {
                    setListId(list);
                }} 
             ></UserTable>
        </div>
    );
}

export default ListUser;
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TableData from '../TableData/TableData';

function ListBike() {
    const [loading, setLoading] = useState(false)
    const [listIdDelete, setListId] = useState([])
    const [isNew, setIsNew] = useState(false);
    const [refresh, setRefresh] = useState(1)
    const [search, setSearch] = useState('');
    return (
        <div className="ListBike">
            <SearchBar 
                list={listIdDelete} 
                callBack={() => {
                    setListId([])
                    if (listIdDelete.length !== 0) alert("Xoá thành công!");
                        else alert("Vui lòng chọn người dùng muốn xóa!")
                    setLoading(!loading)
                }}
                callBackOpen={() => {
                    setIsNew(true);   
                }} 
                updateSearch = {(search) => setSearch(search)}
            ></SearchBar>
            <TableData
                search = {search}
                loading = {loading}
                updateList={(list) => {
                    setListId(list);
                    console.log(list);
                }} 
                refresh={refresh}
             ></TableData>
        </div>
    );
}

export default ListBike;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { Button } from '@mui/material'

const avatar = [
    'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
];
export default function TableData({ loading, updateList, refresh, search }) {
    
    const [posts, setPosts] = useState([])
    const [checked, setChecked] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [url, setUrl] = useState('https://nmcnpm.herokuapp.com/api/v2/station/bikes')

    async function getData() {
        const token = localStorage.getItem("token")
        await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                if (res.data.status === "success") {
                    setupPages(res.data.data.length);
                    setPosts(res.data.data);
                }
            })
    }

    useEffect(() => {
        getData()
    }, [refresh, loading, url])

    // Set up page
    const setupPages = (length) => {
        if (length / 10 > 2) setPages([1, 2, 3]);
        if (length / 10 <= 2 && length / 10 > 1) setPages([1, 2]);
        if (length / 10 <= 1) setPages([1]);
    }

    const handleSetPagesUp = (pages, lengths) => {
        const newpages = [];
        let isChange = false;
        pages.map(page => {
            if (page + 3 < lengths / 10 + 1) {
                newpages.push(page + 3);
                isChange = true;
            }
        })
        if (isChange) return setPages(newpages)
    }

    const handleSetPagesDown = (pages) => {
        const newpages = [];
        if (pages[0] - 3 > 0) {
            newpages.push(pages[0] - 3);
            newpages.push(pages[0] - 2);
            newpages.push(pages[0] - 1);
            return setPages(newpages)
        }
    }

    const handleCheck = (id) => {
        setChecked(prev => {
            const isChecked = checked.includes(id);
            if (isChecked) {
                setCheckedAll(false)
                return checked.filter(item => item !== id)
            } else {
                if (checked.length === stringAfterFilter.length - 1) setCheckedAll(true);
                return [...prev, id]
            }
        })
    }

    useEffect(() => {
        updateList(checked);
      }, [checked])

    let stringAfterFilter = posts.filter((post) => {
        return post.numberPlate.includes(search)
    })
  
    useEffect(() => {
        setChecked([]);
        setCheckedAll(false);
        setupPages(stringAfterFilter.length);
        setCurrentPage(1);
    },[search]);

    const handleCheckAll = (flag) => {
        if (flag) {
            setCheckedAll(!flag);
            setChecked([]);
        } else {
            stringAfterFilter.map(item => {
                if (!checked.includes(item._id)) checked.push(item._id);
                setCheckedAll(!flag);
            })
        }
        updateList(checked);
    }

    return (
        <div className="contentbigTag1" style={{filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",}}>
            
            <div className="contentFirstTag">
                <h2>List Bike</h2>
                <div className="dropdown">
                    <div className="dropdown-select" href="#">
                        <span>Sắp xếp theo</span>
                    </div>
                    <div className="dropdown-list">
                        <div className="dropdown-list-item" onClick={() => setUrl('https://nmcnpm.herokuapp.com/api/v2/station/bikes?type=free')}>Trạng thái: rảnh</div>
                        <div className="dropdown-list-item" onClick={() => setUrl('https://nmcnpm.herokuapp.com/api/v2/station/bikes?type=waiting')}>Trạng thái: bận</div>
                        <div className="dropdown-list-item" onClick={() => setUrl('https://nmcnpm.herokuapp.com/api/v2/station/bikes?type=breakdown')}>Trạng thái: sửa</div>
                        <div className="dropdown-list-item" onClick={() => setUrl('https://nmcnpm.herokuapp.com/api/v2/station/bikes?type=hiring')}>Trạng thái: đã đặt</div>
                        <div className="dropdown-list-item" onClick={() => setUrl('https://nmcnpm.herokuapp.com/api/v2/station/bikes')}>Từ giá thuê cao đến thấp</div>
                        <div className="dropdown-list-item" onClick={() => setUrl('https://nmcnpm.herokuapp.com/api/v2/station/bikes')}>Từ giá thuê thấp đến cao</div>
                    </div>
                </div>
            </div>

            <table className="contenttable">
                <thead>
                    <tr>
                        <th style={{ paddingRight: '32px' }}></th>
                        <th style={{ paddingRight: '30px' }} ><input

                            type="checkbox"
                            className="contentcheckbox"
                            checked={checkedAll}
                            onChange={() => handleCheckAll(checkedAll)}

                        /></th>
                        <th style={{ paddingRight: '150px' }}>Biển số xe</th>
                        <th style={{ paddingRight: '320px' }}>Model</th>
                        <th style={{ paddingRight: '150px' }}>Station</th>
                        <th style={{ paddingRight: '170px' }}>Cost</th>
                        <th style={{ paddingRight: '50px', paddingLeft: '30px' }}>Status</th>
                        <th style={{ paddingLeft: '130px' }}></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        stringAfterFilter.map((post, index) => {
                            if (index >= (currentPage - 1) * 10 && index <= (currentPage - 1) * 10 + 9)
                                return (<tr key={index}>
                                    <td style={{ paddingRight: '0px', width: '0px' }}><div className="contentcolorBar" style={{ color: "#8E8EA1", marginLeft: '-6px', }} ></div></td>
                                    <td>
                                        <input
                                            className="contentcheckbox"
                                            type="checkbox"
                                            checked={checked.includes(post._id)}
                                            onChange={() => handleCheck(post._id)}
                                            style={{ paddingRight: '20px' }}
                                        />
                                    </td>
                                    <td>
                                        <div className="infor" >
                                            <div className="nameAndEmail" style={{ paddingLeft: '0px' }}>
                                                <div className="nameIn" >{post.numberPlate}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ paddingRight: '30px' }} >{post.category.name}</td>
                                    <td style={{ paddingRight: '30px' }} >{post.station.name}</td>
                                    <td style={{ paddingRight: '30px' }} >{post.category.cost}</td>
                                    { (post.status == "free") && <td><div className="status11"  >{post.status}</div></td>}
                                    { (post.status == "waiting") && <td><div className="status11" style={{backgroundColor:"#DD4124"}}  >{post.status}</div></td>}
                                    { (post.status == "hiring") && <td><div className="status11" style={{backgroundColor:"#5B5EA6"}}  >{post.status}</div></td>}
                                    { (post.status == "breakdown") && <td><div className="status11" style={{backgroundColor:"#EFC050"}}  >{post.status}</div></td>}
                                    <td style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        justifyItems: "center",
                                        height: 113,
                                        padding: 0

                                    }}>
                                        
                                       
                                    </td>
                                </tr>)

                        })
                    }
                    <tr>
                    </tr>
                </tbody>

            </table>

            <div className="contentbarBottom">

                <div className="contentcomment">Showing&nbsp;
                    <div className="contentBold">
                        {(currentPage - 1) > 0 ? currentPage - 1 : ""}
                        {((currentPage - 1) * 10 == stringAfterFilter.length) ? 0 : 1}-{(((currentPage - 1) * 10 + 10 < (stringAfterFilter.length)) && (currentPage - 1) * 10 + 10) || stringAfterFilter.length}
                    </div>
                    &nbsp;from
                    <div className="contentBold">&nbsp;{stringAfterFilter.length}&nbsp;</div>
                    data</div>

                <div className="contentnumberTab">

                    <FaCaretLeft className="goicon" onClick={() => handleSetPagesDown(pages)} ></FaCaretLeft>
                    <ul className="contentnumberList">
                        {pages.map(page => {
                            if (page == currentPage)
                                return (
                                    <li><Button id="contentnumber" onClick={() => setCurrentPage(page)}
                                        style={{ color: 'white', background: '#6160DC', textDecoration: 'none' }}
                                    >{page}</Button></li>
                                ); else return (
                                    <li><Button id="contentnumber" onClick={() => setCurrentPage(page)}>{page}</Button></li>
                                )
                        })}
                    </ul>
                    <FaCaretRight className="goicon" onClick={() => handleSetPagesUp(pages, stringAfterFilter.length)} ></FaCaretRight>

                </div>

            </div>

        </div >
    );
}



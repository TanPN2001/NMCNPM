import './Content.css'
import React, { useEffect, useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { Button } from '@mui/material'
import axios from 'axios';
import VerifyInfo from '../../../Admin/ListEmployee/AddAndEditEmployee/verify';

const avatar = [
    'https://cdn-icons-png.flaticon.com/512/147/147144.png',
    'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
];
function Content({search}) {
    const [posts, setPosts] = useState([])
    const [checked, setChecked] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [showVerify, setShowVerify] = useState(false)
    const [selected, setSelected] = useState({})

    // Call API
    useEffect(() => {
        const token = localStorage.getItem("token")
        const url = "https://nmcnpm.herokuapp.com/api/v1/unactivated/users"
        axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                setPosts(res.data.data)
                setupPages(res.data.data.length)
            }).catch(function (error) {
                console.log(error);
            });
    }, [showVerify])

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

    let stringAfterFilter = posts.filter((post) => {
        return post.phoneNumber.includes(search)
    })

    useEffect(() => {
        setChecked([]);
        setCheckedAll(false);
        setupPages(stringAfterFilter.length);
        setCurrentPage(1);
      },[search]);

    const handleCheck = (id) => {
        setChecked(prev => {
            const isChecked = checked.includes(id);
            if (isChecked) {
                setCheckedAll(false)
                return checked.filter(item => item !== id)
            } else {
                if (checked.length == stringAfterFilter.length - 1) setCheckedAll(true);
                return [...prev, id]
            }
        })
    }

    const handleCheckAll = (flag) => {
        if (flag == true) {
            setCheckedAll(!flag);
            setChecked([]);
        } else {
            stringAfterFilter.map(item => {
                if (!checked.includes(item.id)) checked.push(item.id);
                setCheckedAll(!flag);
            })
        }
    }

    return (
        <div className="contentbigTag1">
            {
                (showVerify) && <VerifyInfo infor={selected}
                    callBack={() => {
                        setShowVerify(false)

                    }} />
            }
            <div className="contentFirstTag">
                <h2>Pending History</h2>
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
                        <th style={{ paddingRight: '230px' }}>Information</th>
                        <th style={{ paddingRight: '130px' }}>Indentify code</th>
                        <th style={{ paddingRight: '100px' }}>Phone number</th>
                        <th style={{ paddingRight: '110px' }}>Resident ID</th>
                        <th style={{ paddingRight: '80px', paddingLeft: '25px' }}>Status</th>
                        <th style={{ paddingLeft: '120px'}}></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        stringAfterFilter.map((post, index) => {
                            if (index >= (currentPage - 1) * 10 && index <= (currentPage - 1) * 10 + 9)
                                return (<tr>
                                    <td style={{ paddingRight: '0px', width: '0px' }}><div className="contentcolorBar" style={{ color: "#8E8EA1", marginLeft: '-6px', }} ></div></td>
                                    <td>
                                        <input
                                            className="contentcheckbox"
                                            type="checkbox"
                                            checked={checked.includes(post.id)}
                                            onChange={() => handleCheck(post.id)}
                                            style={{ paddingRight: '20px' }}
                                        />
                                    </td>
                                    <td>
                                        <div className="infor" >
                                            <img className="avatar1" src={avatar[Math.floor(Math.random() * 1)]} />
                                            <div className="nameAndEmail">
                                                <text className="nameIn">{post.name}</text>
                                                <text className="email" >{post.email}</text>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ paddingRight: '30px' }} >{post.identifyNumber}</td>
                                    <td style={{ paddingRight: '30px' }} >{post.phoneNumber}</td>
                                    <td style={{ paddingRight: '30px' }} >{post.residentID}</td>
                                    <td><div className="status11">Pending</div></td>
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
                                        <button style={{
                                            cursor: "pointer",
                                            height: 30,
                                            width: 80,
                                            marginRight: 10,
                                            borderRadius: 5,
                                            backgroundColor: "#6160DC",
                                            color: "white",
                                        }} onClick={() => { console.log("Delete") }}>
                                            Delete
                                        </button>
                                        <button style={{
                                            marginRight: 10,
                                            cursor: "pointer",
                                            height: 30,
                                            width: 80,
                                            borderRadius: 5,
                                            backgroundColor: "#6160DC",
                                            color: "white",

                                        }} onClick={() => {
                                            setSelected(post)
                                            setShowVerify(true)
                                        }}>
                                            Active
                                        </button>
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


export default Content;

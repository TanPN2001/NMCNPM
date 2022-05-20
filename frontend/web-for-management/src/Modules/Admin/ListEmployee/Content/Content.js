import './Content.css'
import React, { useEffect, useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { PropagateLoader } from 'react-spinners';
import AddAndEditEmployee from '../AddAndEditEmployee/AddAndEditEmployee';
import { Button } from '@mui/material'
import axios from 'axios';

const avatar = [
  'https://cdn-icons-png.flaticon.com/512/147/147144.png',
  'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
];
function Content({ loading, updateList, updateRole, search }) {
  const [posts, setPosts] = useState([])
  const [checked, setChecked] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [isEditing, setEditing] = useState(false)
  const [indexx, setIndex] = useState(1)
  const [checkedAll, setCheckedAll] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [option, setOption] = useState([true, false]);

  const handleSetPagesUp = (pages, lengths) => {
    const newpages = [];
    let isChange = false;
    pages.map(page => {
      console.log(lengths / 10 + 1);
      console.log(page);
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
        updateList(checked.filter(item => item !== id))
        return checked.filter(item => item !== id)
      } else {
        if (checked.length == posts.length - 1) setCheckedAll(true);
        updateList([...prev, id])
        return [...prev, id]
      }
    })
  }

  const handleCheckAll = (flag) => {
    if (flag == true) {
      setCheckedAll(!flag);
      updateList(checked.splice(0, checked.length))
      setChecked([]);
    } else {
      posts.map(post => {
        if (!checked.includes(post._id)) checked.push(post._id);
        setCheckedAll(!flag);
      })
      updateList(checked)
    }
  }

  async function deleteMember(index) {
    const id = posts[index]._id
    const url = `https://nmcnpm.herokuapp.com/api/v1/accounts/delete?type=${option[0] == true ? "receptionist" : "staff"}/` + id
    console.log(url)
    const token = localStorage.getItem("token")
    await axios.delete(url, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        console.log(res)
      }).catch(function (error) {
        console.log(error);
      });
    setChecked([]);
    setCheckedAll(false)
  }

  async function getEmployee(type) {
    const url = 'https://nmcnpm.herokuapp.com/api/v1/account/search?type=' + type + '&q=' + search;
    console.log(url);
    const token = localStorage.getItem("token")
    await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        setPosts(res.data.data)
        setupPages(res.data.data.length)
      }).catch(function (error) {
        console.log(error);
      });
    setLoading(false)
    setChecked([]);
    setCheckedAll(false)
  }

  //Call API
  useEffect(() => {
    if (option[0] === true) {
      setLoading(true)
      getEmployee("receptionist")
    } else {
      setLoading(true)
      getEmployee("staff")
    }
    setChecked([])
    setCheckedAll(false)
  }, [option, loading, search])

  const setupPages = (length) => {
    if (length / 10 > 2) setPages([1, 2, 3]);
    if (length / 10 <= 2 && length / 10 > 1) setPages([1, 2]);
    if (length / 10 <= 1) setPages([1]);
  }
  return (
    <div>
      {
        (isEditing) && <AddAndEditEmployee callBack={() => {
          setEditing(!isEditing)
          if (option[0] === true) {
            setLoading(true)
            getEmployee("receptionist")
          } else {
            setLoading(true)
            getEmployee("staff")
          }
        }
        } infor={posts[indexx]}></AddAndEditEmployee>
      }
      <div className="contentbigTag1">

        <div className="contentFirstTag">
          <h2 id="title">Receptionist History</h2>
          {option.map((op, index) => {
            if ((op == true) && (index === 0))
              return <Button id="buttonReceptionist" variant="contained"
                onClick={() => {
                  setOption([true, false])
                  updateRole([true, false])
                  setCheckedAll(false)
                  setChecked([])
                  updateList([])
                  console.log(currentPage);
                }}>Receptionist</Button>
            if ((op == false) && (index === 0))
              return <Button id="buttonReceptionist" variant="contained"
                style={{ backgroundColor: '#8E8EA1' }}
                onClick={() => {
                  setOption([true, false])
                  updateRole([true, false])
                  setCheckedAll(false)
                  setChecked([])
                  updateList([])
                  setCurrentPage(1)
                  console.log(currentPage);
                }}>Receptionist</Button>
            if ((op == true) && (index === 1))
              return <Button id="Newmember" variant="contained"
                onClick={() => {
                  setOption([false, true])
                  updateRole([false, true])
                  setChecked([])
                  setCheckedAll(false)
                  updateList([])
                }}
              >Staff</Button>
            if ((op == false) && (index === 1))
              return <Button id="Newmember" variant="contained"
                style={{ backgroundColor: '#8E8EA1' }}
                onClick={() => {
                  setOption([false, true])
                  updateRole([false, true])
                  setCheckedAll(false)
                  setChecked([])
                  updateList([])
                  setCurrentPage(1)
                }}
              >Staff</Button>
          }
          )}

        </div>

        {
          (isLoading) ? <div style={{ paddingLeft: 745 }}><PropagateLoader color="#6160DC" /></div> :
            <table className="contenttable">
              <thead>
                <tr>
                  <th style={{ paddingRight: '60px' }}></th>
                  <th style={{ paddingRight: '40px' }} ><input

                    type="checkbox"
                    className="contentcheckbox"
                    checked={checkedAll}
                    onChange={() => handleCheckAll(checkedAll)}

                  /></th>
                  <th style={{ paddingRight: '205px' }}>Information</th>
                  <th style={{ paddingRight: '135px' }}>Indentify code</th>
                  <th style={{ paddingRight: '125px' }}>Department</th>
                  <th style={{ paddingRight: '125px' }}>Location</th>
                  <th style={{ paddingRight: '75px' }}>Phone number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  posts.map((post, index) => {
                    if (index >= (currentPage - 1) * 10 && index <= (currentPage - 1) * 10 + 9)
                      return (<tr>
                        <td style={{ paddingRight: '0px', width: '0px' }}><div className="contentcolorBar" style={{ color: "#8E8EA1", marginLeft: '-6px', }} ></div></td>
                        <td>
                          <input
                            key={index}
                            className="contentcheckbox"
                            type="checkbox"
                            checked={checked.includes(post._id)}
                            onChange={() => handleCheck(post._id)}
                            style={{ paddingRight: '20px' }}
                          />
                        </td>
                        <td>
                          <div className="contentinfor" >
                            <img className="contentavatarLi" src={avatar[Math.floor(Math.random() * 1)]} alt="avatarIcon" />
                            <div className="contentnameAndEmail">
                              <text className="contentnameIn" title={post.name}>{post.name}</text>
                              <text className="contentemail" title={post.email} >{post.email}</text>
                            </div>
                          </div>
                        </td>
                        <td style={{ paddingRight: '50px' }} title={post.identifyNumber}>{post.identifyNumber}</td>
                        <td style={{ paddingRight: '50px' }} >{option[0] == true ? "Receptionist" : "Staff"}</td>
                        <td style={{ paddingRight: '50px' }} title={post.address}>{post.address}</td>
                        <td style={{ paddingRight: '50px' }} title={post.phoneNumber}>{post.phoneNumber}</td>
                        <td>
                          <div>

                            <div style={{ marginBottom: '20px' }}>
                              <button
                                className="contentedit-button"
                                onClick={() => {
                                  deleteMember(index)
                                  setCheckedAll(false)
                                  setChecked([])
                                  alert("Delete successful")
                                  if (option[0] === true) {
                                    setLoading(true)
                                    getEmployee("receptionist")
                                  } else {
                                    setLoading(true)
                                    getEmployee("staff")
                                  }

                                }
                                }
                              >
                                Delete
                              </button>
                            </div>

                            <div>
                              <button
                                className="contentedit-button" onClick={() => {
                                  setIndex(index)
                                  setEditing(!isEditing)
                                }}
                              >
                                Edit
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>)
                  }
                  )}
              </tbody>
            </table>
        }

        <div className="contentbarBottom">

          <div className="contentcomment">Showing&nbsp;
            <div className="contentBold">
              {(currentPage - 1) > 0 ? currentPage - 1 : ""}
              {((currentPage - 1) * 10 == posts.length) ? 0 : 1}-{(((currentPage - 1) * 10 + 10 < (posts.length)) && (currentPage - 1) * 10 + 10) || posts.length}
            </div>
            &nbsp;from
            <div className="contentBold">&nbsp;{posts.length}&nbsp;</div>
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
            <FaCaretRight className="goicon" onClick={() => handleSetPagesUp(pages, posts.length)} ></FaCaretRight>

          </div>

        </div>

      </div >
    </div >
  );
}


export default Content;

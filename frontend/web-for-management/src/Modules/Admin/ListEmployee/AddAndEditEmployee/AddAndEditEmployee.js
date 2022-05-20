import React, { useState } from 'react';
import './AddAndEditEmployee.css';
import InputWithValidate from '../../../../shared/Layout/InputWithValidate';
import { validateEmail, validateIdCode, validatePassword, validatePhone } from '../../../../shared/utils/Validate'
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';
function AddAndEditEmployee({ callBack, infor, isAdd }) {
  const [info, updateInfo] = useState({
    name: (infor !== undefined) ? infor.name : '',
    identifyNumber: (infor !== undefined) ? infor.identifyNumber : '',
    userName: (infor !== undefined) ? infor.userName : '',
    address: (infor !== undefined) ? infor.address : '',
    birth: (infor !== undefined) ? infor.birth : '',
    phoneNumber: (infor !== undefined) ? infor.phoneNumber : '',
    password: (infor !== undefined) ? infor.password : '',
    email: (infor !== undefined) ? infor.email : ''
  })
  const [role, updateRole] = useState((infor === undefined) ? 1 : (infor.role === "staff") ? 2 : 1)
  
  // const [submit, submitState] = useState(false);

  // const submitted = () => {
  //   // submitState(true);
  //   alert(info)
  // }
  const [loading, setLoading] = useState(false)
  const [needValidate, setValidate] = useState(1)
  const [confirmPassword, setConfirm] = useState("")

  async function editMember() {
    setLoading(true)
    console.log(infor._id)
    console.log("Begin============")
    const url = 'https://nmcnpm.herokuapp.com/api/v1/accounts/edit?type=' + ((role === 1) ? "receptionist/" : "staff/") + infor._id
    console.log(url)
    const token = localStorage.getItem("token")
    const data = {
      identifyNumber: info.identifyNumber,
      userName: info.userName,
      password: info.password,
      email: info.email,
      phoneNumber: info.phoneNumber,
      address: info.address,
      name: info.name,
    }
    await axios.post(url, data, {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then(res => {
        console.log(res.data)
        if (res.data.status === "success") {
          window.confirm("Editing successfull")
          callBack()
        } else {
          window.confirm("Somethings wrong in process, please try again")
        }
      }).catch(function (error) {
        console.log(error);
        console.log("END=============")
      });
    setLoading(false)
  }
  async function addNewMember() {
    setLoading(true)
    console.log("Begin============")
    const url = 'https://nmcnpm.herokuapp.com/api/v1/accounts/add?type=' + ((role === 1) ? "receptionist" : "staff")
    console.log(url)
    const token = localStorage.getItem("token")
    const data = {
      identifyNumber: info.identifyNumber,
      userName: info.userName,
      password: info.password,
      email: info.email,
      phoneNumber: info.phoneNumber,
      address: info.address,
      name: info.name,
    }
    console.log(data)
    await axios.post(url, data, {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then(res => {
        console.log(res.data)
        if (res.data.status === "success") {
          window.confirm("Adding successfull")
          callBack()
        } else {
          window.confirm(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error);
        console.log("END=============")
      });
    setLoading(false)
  }

  return (
    <div className="pops-up-menu-addemm-long">
      <div class="head-addem-long">
        <button type="button" className="button1-addemm-long" onClick={() => { callBack() }} />
        <h1>{(isAdd) ? "Adding" : "Editing"} Employee</h1>
      </div>
      <div className="content-addemm-long">
        {/* left menu  start*/}
        <div id="left-addemm-long" >
          <h2 class = "h2-addemm-long" style={{ position: "relative", }}>Department</h2>
          <div style={{
            backgroundColor: (role === 1) ? "#6160DC" : "grey",
            height: 54,
            borderRadius: 20,
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            cursor: "pointer"
          }}
            onClick={() => {
              if (isAdd !== undefined)
                updateRole(1)
            }}
          >Receptionist</div>
          <div
            style={{
              marginTop: 10,
              backgroundColor: (role === 2) ? "#6160DC" : "grey",
              height: 54,
              borderRadius: 20,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={() => {
              if (isAdd !== undefined)
                updateRole(2)
            }}

          >Staff</div>
          {/* <span className="switcher switcher-2">
            <input type="checkbox" id="switcher-2" />
            <label htmlFor="switcher-2" />
          </span> */}
        </div>
        {/* left menu  end*/}
        {/* right menu  start*/}
        <div className="right-menu-addemm-long">
          <h2 class = "h2-addemm-long">Account</h2>
          <form name="employee">
            {/* <div className="left"> */}
            <div class="row-addemm-long">
              <div class="col-addemm-long">
                <label class="lab-addemm-long" htmlFor="nam-addemm-longe">Name</label><br />
                <InputWithValidate
                
                  className="left-addemm-long"
                  elementId="name-addemm-long"
                  callBack={value => updateInfo({ ...info, name: value })}
                  validate={validateString} // Luôn đúng 
                  needValidateState={needValidate}
                  message=""
                  valueState={info.name}
                  stylesMessage={{
                    paddingLeft: "15%",
                  }}
                  styles={{
                    marginBottom: 15,
                  }}
                />
              </div>
              <div class="col-addemm-long">
                <label class="lab-addemm-long" htmlFor="id-code-addemm-long">Indentify Code</label><br />
                <InputWithValidate
                  className="left-addemm-long"
                  elementId="id-code-addemm-long"
                  callBack={value => updateInfo({ ...info, identifyNumber: value })}
                  validate={validateIdCode}
                  needValidateState={needValidate}
                  message=""
                  valueState={info.identifyNumber}
                  stylesMessage={{
                    paddingLeft: "15%",
                  }}
                  styles={{
                    marginBottom: 15,
                  }}
                />
              </div>
            </div>
            <div className="row-addemm-long">
              <div class="col-addemm-long">
                <label class="lab-addemm-long" htmlFor="userName-addemm-long">Email</label><br />
                <InputWithValidate
                  elementId="username-addemm-long"
                  callBack={value => updateInfo({ ...info, email: value })}
                  validate={validateEmail} // Luôn đúng 
                  needValidateState={needValidate}
                  message=""
                  valueState={info.email}
                  stylesMessage={{
                    paddingLeft: "15%",
                  }}
                  styles={{
                    marginBottom: 15,
                  }}
                />
              </div>
              <div class="col-addemm-long">
                <label class="lab-addemm-long" htmlFor="phoneNumber-addemm-long">Phone number</label><br />
                <InputWithValidate

                  elementId="phoneNumber-addemm-long"
                  callBack={value => updateInfo({ ...info, phoneNumber: value })}
                  validate={validatePhone} // Luôn đúng 
                  needValidateState={needValidate}
                  message=""
                  valueState={info.phoneNumber}
                  stylesMessage={{
                    paddingLeft: "15%",
                  }}
                  styles={{
                    marginBottom: 15,
                  }}
                />
              </div>
            </div>
            {
              (isAdd) && <div class="row-addemm-long">
                <div class="col-addemm-long">
                  <label class="lab-addemm-long" htmlFor="password-addemm-long">Password</label><br />
                  <InputWithValidate
                    className="left-addemm-long"
                    elementId="password-addemm-long"
                    password={true}
                    callBack={value => updateInfo({ ...info, password: value })}
                    validate={validatePassword} // Luôn đúng 
                    needValidateState={needValidate}
                    message=""
                    valueState={info.password}
                    stylesMessage={{
                      paddingLeft: "15%",
                    }}
                    styles={{
                      marginBottom: 15,
                    }}
                  />
                </div>
                <div class="col-addemm-long">
                  <label class="lab-addemm-long" htmlFor="password-addemm-long">Confirm Password</label><br />
                  <InputWithValidate
                    password={true}
                    elementId="password-addemm-long"
                    callBack={value => setConfirm(value)}
                    validate={(password) => {
                      if (password !== info.password) {
                        return "Password not match"
                      } else {
                        return ""
                      }
                    }} // Luôn đúng 
                    needValidateState={needValidate}
                    message=""
                    valueState={info.password}
                    stylesMessage={{
                      paddingLeft: "15%",
                    }}
                    styles={{
                      marginBottom: 15,
                    }}
                  />

                </div>
              </div>
            }

            <div className="row-addemm-long">
              <div class="col-addemm-long">
                <label class="lab-addemm-long" htmlFor="address-addemm-long">Address</label><br />
                <InputWithValidate
                  className="left-address-addemm-long"
                  elementId="address-addemm-long"
                  callBack={value => updateInfo({ ...info, address: value })}
                  validate={validateString} // Luôn đúng 
                  needValidateState={needValidate}
                  message=""
                  valueState={info.address}
                  stylesMessage={{
                    paddingLeft: "15%",
                  }}
                />
              </div>
            </div>
            <div class="row-addemm-long">
              <button type="button-addemm-long" id="save-addemm-long" onClick={(e) => {
                e.preventDefault();
                setValidate(needValidate + 1)
                const checkEmail = (validateEmail(info.email) === "")
                const checkIdCode = (validateIdCode(info.identifyNumber) === "")
                const checkPhone = (validatePhone(info.phoneNumber) === "")
                console.log(checkEmail)
                console.log(checkIdCode)
                console.log(checkPhone)
                if (checkEmail && checkIdCode && checkPhone) {
                  if (isAdd) {
                    console.log(info.password)
                    console.log(confirmPassword)
                    if (info.password === confirmPassword) {
                      console.log("Add a new member")
                      addNewMember()
                    }
                  } else {
                    editMember()
                    console.log("Edit a member")
                  }
                } else {

                  console.log("Noooooooooooooo")
                }

              }
              }>

                {
                  (loading) ?
                    <PropagateLoader color="white" /> : (isAdd) ? "Add new member" : "Edit this member"
                }
              </button>
            </div>
            {/* </div> */}
          </form>
        </div>
        {/* right menu  end*/}
      </div>
    </div>
  );
}
function validateString(value) {
  if (value === "") { return "This field is required" } else return ""
}
export default AddAndEditEmployee;

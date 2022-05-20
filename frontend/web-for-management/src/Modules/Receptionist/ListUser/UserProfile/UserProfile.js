import React, {useState}  from 'react';
import './UserProfile.css';
import axios from 'axios';
export default function UserProfile(infor, callBack){
    const [info, updateInfo] = useState({
        name: (infor != undefined) ? infor.name : '',
        identifyNumber: (infor != undefined) ? infor.identifyNumber : '',
        address: (infor != undefined) ? infor.address : '',
        phoneNumber: (infor != undefined) ? infor.phoneNumber : '',
        email: (infor != undefined) ? infor.email : '',
        balance: (infor != undefined) ? infor.balance : '0',
        residentNumber: (infor != undefined) ? infor.residentNumber : '',
      })
      const [loading, setLoading] = useState(false)
    //   const [needValidate, setValidate] = useState(1)
      async function updateUserProfile() {
       
        console.log(infor._id)
        console.log("Begin============")
        const url = ''
        console.log(url)
        const token = localStorage.getItem("token")
        const data = {
          identifyNumber: info.identifyNumber,
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
            if (res.data.status == "success") {
              window.confirm("Editing successfull")
              callBack()
            } else {
              window.confirm("Somethings wrong in process, please try again")
            }
          }).catch(function (error) {
            console.log(error);
            console.log("END=============")
          });
      
      }

    return (
        <div class = "userprofile-popsup-long">
                {/* header start */}
                    <div class="header-userprofile-long">Profile</div>
                {/* header end */}

        {/* content start */}
            <div class ="content-userprofile-long">
                <div class="row-userprofile-long">
                    <div class="col-userprofile-long">
                        <label>Name</label>
                        <input  value={infor.name}></input>
                    </div>
                    <div class="col-userprofile-long">
                        <label>Identify Number</label>
                        <input disabled="true" value={infor.indentifyNumber}></input>
                    </div>
                </div>
                <div class="row-userprofile-long">
                    <div class="col-userprofile-long">
                        <label>Resident number</label>
                        <input value={infor.residentNumber}></input>
                    </div>
                    <div class="col-userprofile-long">
                        <label>Account balance</label>
                        <input disabled="true" value={infor.balance}></input>
                    </div>
                </div>
                <div class="row-userprofile-long">
                    <div class="col-userprofile-long">
                        <label>Email</label>
                        <input disabled="true" value={infor.email}></input>
                    </div>
                    <div class="col-userprofile-long">
                    <label>Address</label>
                        <input value={infor.address}></input>
                    </div>
                </div>
                <div class="row-userprofile-long">
                    <div class="col-userprofile-long">
                        <label>Phone Number</label>
                        <input value={infor.phoneNumber}></input>
                    </div>
                    <div class="col-userprofile-long">
                       
                    </div>
                </div>
                <div class="row-userprofile-long">
                    <div class="col-userprofile-long">
                        
                    </div>
                    <div class="col-userprofile-long">
                        {/* <label></label>
                        <input></input> */}
                    </div>
                </div>
            </div>
        {/* content end */}

        {/* button start*/}
            <div class="row-userprofile-long" id="button-row-long">
                <div class="button-profile-long">History Bill</div>
                <div class="button-profile-long" onClick={updateUserProfile}>Update</div>
                <div class="button-profile-long" onClick={callBack}>Exit</div>
            </div>
        {/* button end */}
        </div>

    )
}
function validateString(value) {
    if (value == "") { return "This field is required" } else return ""
  }
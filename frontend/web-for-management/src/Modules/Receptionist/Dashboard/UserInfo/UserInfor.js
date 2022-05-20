import Addresspng from '../../../../shared/icons/address.png'
import Emailpng from '../../../../shared/icons/email.png'
import Phonepng from '../../../../shared/icons/phone.png'
import Avtpng from '../../../../shared/images/Avater.jpg'
import logout from '../../../../shared/icons/logout.png'
import changepasspng from '../../../../shared/icons/sync-alt.png'
import ChangePassword from '../ChangePassword/ChangePassword'
import './UserInfor.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function UserInfor(props) {
    const {tag, setToken} = props

    let info = JSON.parse(localStorage.getItem("info"))
    if (localStorage.getItem("role") === "admin") {
        info = {
            name: "Admin",
            identifyNumber: "Loading...",
            email: "admin@gmail.com",
            phoneNumber: "Loading..."
        }
    }
    return (
        <div>
            <ProFile
                setToken={setToken}
                avatar={Avtpng}
                name={info.name}
                tag={tag}
                phoneNumber={info.phoneNumber}
                email={info.email}
                idCode={info.identifyNumber}
                setIsChange={props.setIsChange}
            >
            </ProFile>
        </div>
    )
}

function ProFile(props) {
    const avatar = props.avatar
    const name = props.name
    const tag = props.tag
    const phoneNumber = props.phoneNumber
    const email = props.email
    const idCode = props.idCode
    const navigate=useNavigate();

    return (
        <div className="userInfor" style={{marginLeft:"2%"}}>
            <div id="Avartar">
                <img id="InsideAvt" src={avatar} alt="" />
            </div>
            <div className="line">
                <div className="line1">
                    <div className="name">
                        <span className="fullName">{name}</span>
                        <span className="tag">{tag}</span>
                    </div>
                    <button className="logOut" onClick={() => {
                        props.setToken(null)
                        navigate("/login")
                        }}
                        >
                        <span className="insideLogOut">Logout</span>
                        <span className="LogOutimg">
                            <img src={logout} alt="" />
                        </span>
                    </button>
                </div>
                <div className="line2">
                    <div className="idDivision">
                        <div className="image">
                            <img src={Addresspng} alt="" />
                        </div>
                        <div id="USdetail">
                            <div className="titleOfInfor">Identity Code</div>
                            <div className="detail">{idCode}</div>
                        </div>
                    </div>
                    <div className="emailDivision">
                        <div className="image">
                            <img src={Emailpng} alt="" />
                        </div>
                        <div id="USdetail">
                            <div className="titleOfInfor">Email</div>
                            <div className="detail">{email}</div>
                        </div>
                    </div>
                    <div className="phoneDivision">
                        <div className="image">
                            <img src={Phonepng} alt="" />
                        </div>
                        <div id="USdetail">
                            <div className="titleOfInfor">Phone Number</div>
                            <div className="detail">{phoneNumber}</div>
                        </div>
                    </div>
                    <button className="changePass" onClick={()=>{
                        props.setIsChange(true)
                    }}>
                        <span className="insideChangePass">Change password</span>
                        <div id="changepass">
                            <img src={changepasspng} alt="" />
                        </div>
                    </button>
                </div>
            </div>
       
        </div>
    )
}
import Addresspng from '../../../../shared/icons/address.png'
import Emailpng from '../../../../shared/icons/email.png'
import Phonepng from '../../../../shared/icons/phone.png'
import Avtpng from '../../../../shared/images/Avater.jpg'
import logout from '../../../../shared/icons/logout.png'
import changepasspng from '../../../../shared/icons/sync-alt.png'
import ChangePassword from '../ChangePassword/ChangePassword'
import './UserInfor.css'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
function UserInfor(props) {
    const tag = props.tag
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
                setToken={props.setToken}
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

function ProFile(user) {
    const navigate=useNavigate()
    return (
        <div className="userInfor">
            <div id="Avartar">
                <img id="InsideAvt" src={user.avatar} alt="" />
            </div>
            <div className="line">
                <div className="line1">
                    <div className="name">
                        <span className="fullName">{user.name}</span>
                        <span className="tag">{user.tag}</span>
                    </div>
                    <button className="logOut" onClick={() => {
                        user.setToken(null)
                        navigate("/login")
                        }}>
                        <span className="insideLogOut">Logout</span>
                        <span className="LogOutimg">
                            <img src={logout} alt="" />
                        </span>
                    </button>
                </div>
                <div className="line2">
                    <div className="idDivision">
                        <div className="image">
                            <img className='image1' src={Addresspng} alt="" />
                        </div>
                        <div className='USdetail'>
                            <span className="titleOfInfor">Identity Code</span>
                            <span className="detail">{user.idCode}</span>
                        </div>
                    </div>
                    <div className="emailDivision">
                        <div className="image">
                            <img className='image1' src={Emailpng} alt="" />
                        </div>
                        <div className='USdetail'>
                            <span className="titleOfInfor">Email</span>
                            <span className="detail">{user.email}</span>
                        </div>
                    </div>
                    <div className="phoneDivision">
                        <div className="image">
                            <img className='image1' src={Phonepng} alt="" />
                        </div>
                        <div className='USdetail'>
                            <span className="titleOfInfor">Phone Number</span>
                            <span className="detail">{user.phoneNumber}</span>
                        </div>
                    </div>
                    <button className="changePass" onClick={()=>{
                        user.setIsChange(true)
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
export default UserInfor
        
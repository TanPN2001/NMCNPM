import React, { useState } from "react";
import './forgotPassword.css';
import InputWithValidate from '../../../../shared/Layout/InputWithValidate'
import axios from "axios";
import { validateEmail } from '../../../../shared/utils/Validate'
import { IoArrowBackOutline } from "react-icons/io5"
import { TextField } from "@mui/material";

export default function ForgotPassword({ callBack }) {

    const [isLoading, setIsLoading] = useState(false)
    const [serverMessage, setServerMessage] = useState(["", ""])
    const [needValidateState, setValidate] = useState(1)
    const [username, setUsername] = useState("")
    const [role, setRole]= useState("receptionist")

    async function postData(email, role) {
        let token = localStorage.getItem("token")
        const url = `https://nmcnpm.herokuapp.com/api/v2/${role}/forgetpass`
        const data = {
            email: email
        }
        setIsLoading(true)
        const res = await axios.post(url, data, { headers: { "Authorization": `Bearer ${token}` } }).then(function (response) {
            const getData = (response.data)
            console.log(response)
            if (getData.status === false) {
                const message = getData.msg
                setServerMessage([message, serverMessage[1]])
            } else {
                localStorage.setItem("info", JSON.stringify(getData.data))
                alert(getData.msg)
            }
        }).catch(function (err) {
            console.log(err);
        })
        setIsLoading(false)
    }

   

    const handleChange = (event) => {
        setUsername(event.target.value);
        console.log(username)
    }

    return (
        <div className="body-form-login-forget">
            <div style={{ display: "flex", justifyContent: "space-between", marginTop:"10px"}}>
                <IoArrowBackOutline className="Tan-but-login-back" onClick={callBack} />
                <h2 style={{ padding: "0px", margin: "0px", marginRight:"5px" }}>Forgot password</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <TextField
                    style={{marginTop:"20px"}}
                    
                    placeholder="Please insert your email!"
                    value={username}
                    onChange={handleChange}
                    type="email"
                    margin="dense"
                    variant="outlined"
                    label="Insert your email"
                    helperText={validateEmail}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <label >Please select your role</label>
                <select name="role" id="role" style={{ border: "1px solid black", display: "inline-block", padding: "5px",height:"31px", cursor:"pointer" }} onChange={(e)=>setRole(e.target.value)}>
                    <option value="receptionist">Receptionist</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                </select>
            </div>

            <div className="TanPN-login-but-form" style={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
                <button className="TanPN-but-login" onClick={() => {
                    setValidate(needValidateState + 1)
                    setServerMessage(["", ""])
                    
                    if (validateEmail(username) == "") {
                        postData(username, role)
                        console.log(validateEmail(username))
                    }
                    else {
                        setValidate(needValidateState + 1)
                        setServerMessage(["", ""])
                        console.log(serverMessage)
                    }
                }}>
                    Forgot password
                </button>
            </div>
        </div>
    )
}
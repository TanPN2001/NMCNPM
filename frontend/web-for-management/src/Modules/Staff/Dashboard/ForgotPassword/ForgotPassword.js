
import './ForgotPassword.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";
import InputWithValidate from '../../../../shared/Layout/InputWithValidate'
import { validateEmail, validatePassword } from "../../../../shared/utils/Validate";
import {FaTimesCircle} from "react-icons/fa"

export default function Forgotpassword({callBack}) {


    const [isLoading, setIsLoading] = useState(false)
    const [serverMessage, setServerMessage] = useState(["", ""])
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("admin")
    const [needValidateState, setValidate] = useState(1)


    async function postData(email){
        let tooken = localStorage.getItem("token")
        const url = 'https://nmcnpm.herokuapp.com/api/v2/staff/forgetpass'

        const data = {
            email: email
        }

        setIsLoading(true)

        const res = await axios.post(url, data, {headers:{"Authorization" : `Bearer ${tooken}`}}).then(function (response){
            const getData = (response.data)
            console.log(response)
            if(getData.status === false) {
                const message = getData.msg
                setServerMessage([message, serverMessage[1]])
            } else {
                localStorage.setItem("info", JSON.stringify(getData.data))
                callBack(role)
                alert(getData.msg)
            }
        }).catch(function(err){
            console.log(err);
        })
        setIsLoading(false)
    }


    return(
        <div className='TanPN-findYourPassword__model'>
            <div className='TanPN-findYourPassword__modelOverlay'>
            </div>
            <div className='TanPN-findYourPassword__modelBody'>
                <div className = 'TanPN-findYourPassword'>
                        <div className = 'TanPN-findYourPassword__header'>
                            
                            <p className='TanPN-findYourPassword__txtheader'>Find your password</p>
                            <FaTimesCircle className='iconnnnnn' onClick={callBack}>

                            </FaTimesCircle>
                        </div>
                        <hr/>
                        <div className = 'TanPN-findYourPassword__form'>
                            <p className='TanPN-findYourPassword__txtform'>
                                Please enter your email
                            </p>
                            <div className = 'TanPN-findYourPassword__Email'>
                                <InputWithValidate 
                                    className='TanPN-inputEmail'
                                    placeholder="Email"
                                    message={serverMessage[0]}
                                    valueState={username}
                                    needValidateState={needValidateState}
                                    callBack={(value) => setUsername(value)}
                                    validate={validateEmail}
                                />
                            </div>
                        </div>
                        <div className = 'TanPN-findYourPassword__control'>
                            <Button disabled={isLoading} className='but TanPN-findYourPassword_butCan' variant="contained" onClick={callBack} >Cancel</Button> 
                            <Button className='but TanPN-findYourPassword_butSave' variant="contained" onClick={() => {
                                setValidate(needValidateState + 1)
                                setServerMessage(["", ""])
                                console.log(setServerMessage)
                                if(validateEmail(username)==""){
                                    postData(username)
                                }
                                else {
                                    setValidate(needValidateState + 1)
                                        setServerMessage([1])
                                }
                            }}>Sent</Button>
                        </div>
                </div>
            </div>
            
        </div>
       
    )
}

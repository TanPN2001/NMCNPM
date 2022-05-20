import React, { useEffect, useState } from 'react';
import LoginLogo from "../../../shared/images/login-logo.png"
import './Login.css'
import { PropagateLoader } from 'react-spinners';
import { login } from '../Controller/LoginController';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { style } from '@mui/system';
import ForgotPassword from './ForgotPassword/forgotPassword'
import LoginItem from './LoginItem';

function Login({ token, setToken, setRole }) {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        role: "receptionist",
        email: "",
        password: ""
    })

    const [validate, setValidate] = useState({
        email: {
            error: false,
            msg: ""
        },
        password: {
            error: false,
            msg: ""
        }
    })

    let navigate = useNavigate();
    const handleClick = (role) => {
        navigate(`/${role}`)
    }

    useEffect(() => {
        setToken(null);
        localStorage.removeItem("token")
    }, [])

    const postData = async (user) => {
        setIsLoading(true);
        const { role, token, info, success, msg, station } = await login(user);
        if (success) {
            localStorage.setItem("role", role)
            localStorage.setItem("token", token)
            localStorage.setItem("info", info)
            localStorage.setItem("station", station)
            setToken(token)
            setRole(role)
            handleClick(role);
        } else {
            if (msg.includes('email')) {
                setValidate({
                    ...validate, email: {
                        error: true,
                        msg: msg
                    },
                    password: {
                        error: false,
                        msg: ""
                    }
                })
            } else {
                setValidate({
                    ...validate, password: {
                        error: true,
                        msg: msg
                    },
                    email: {
                        error: false,
                        msg: ""
                    }
                })
            }
        }
        setIsLoading(false)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
        if (value !== "") setValidate({
            ...validate, [name]: {
                error: false,
                msg: ""
            }
        })
    }

    const handleValidate = (user) => {
        if (user.email === "") {
            setValidate({
                ...validate, email: {
                    error: true,
                    msg: "Please enter your email"
                }, password: {
                    error: false,
                    msg: ""
                }
            })
        } else if (user.password === "") {
            setValidate({
                ...validate, password: {
                    error: true,
                    msg: "Please enter your password"
                }, email: {
                    error: false,
                    msg: ""
                }
            })
        }
    }


    const [isChange, setIsChange] = useState(false)

    return (
        <div className="login-screen">
            <div className="login-left-layout">
                <img src={LoginLogo} style={{
                    width: "60%",
                    height: "auto",
                }} alt="login logo" />
            </div>

            <div className="login-right-layout">
                {
                    (isChange) && <ForgotPassword callBack={() => { setIsChange(false) }} />
                }
                {
                    (!isChange) && <LoginItem validate={validate} user={user} handleChange={handleChange} isLoading={isLoading} handleValidate={handleValidate} postData={postData} setIsChange={setIsChange} />
                }
            </div>
            
        </div>

    );
}


export default Login;

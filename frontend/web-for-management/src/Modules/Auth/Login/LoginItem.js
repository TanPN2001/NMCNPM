import { TextField } from "@mui/material"
import { PropagateLoader } from "react-spinners"
import './Login.css'
export default function LoginItem({ validate, user, handleChange, isLoading, handleValidate, postData, setIsChange }) {
    return (
        <div className="login-form">
            <div>
                <h1 style={{ marginLeft: "10px", fontFamily:"Poppins" }}>
                    Login
                </h1>
            </div>
            <div style={{ marginTop: "10px" }}>
                <TextField
                    className="Tan-textfield"
                    error={validate.email.error}
                    label="Email"
                    name="email"
                    color="success"
                    
                    type="email"
                    value={user.email}
                    margin="dense"
                    variant="outlined"
                    onChange={handleChange}
                    helperText={validate.email.msg}
                />
            </div>
            <div style={{ marginTop: "20px" }}>
                <TextField
                    error={validate.password.error}
                    label="Password"
                    name="password"
                    type="password"
                    color="success"
                    fullWidth
                    value={user.password}
                    margin="dense"
                    variant="outlined"
                    onChange={handleChange}
                    helperText={validate.password.msg}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                <label >Please select your role</label>
                <select name="role" id="role" style={{ border: "1px solid black", display: "inline-block", padding: "5px", cursor:"pointer" }} onChange={handleChange}>
                    <option value="receptionist">Receptionist</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                </select>
            </div>
            <div style={{
                display: 'flex',
                height: 40,
                justifyContent: "space-between",
                marginTop: "10px",

            }} className='Tan-div-login'>
                <button
                    style={{
                        width: "100px",
                        backgroundColor: "#6160DC",
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: "600",
                        fontsize: "16px",
                        boxShadow:"0px 4px 4px #EFEFEF",
                        borderRadius:"10px",
                        border:"1px solid #6160DC",
                        color:"white",
                        cursor:"pointer",
                        
                    }}
                    disabled={isLoading}
                    onClick={() => {
                        handleValidate(user)
                        if (user.email != "" && user.password != "") {
                            postData(user)
                        }

                    }}
                >
                    {(isLoading) ? <PropagateLoader color="white" size={10} /> : "Sign In"}
                </button>

                <button
                    style={{
                      backgroundColor:"white",
                      cursor:"pointer",
                      textAlign:"start",
                      fontWeight:"bold",
                      marginRight:"40px"

                    }}
                    onClick={() => {
                        setIsChange(true)
                    }}
                >
                    Forgot password?
                </button>
            </div>
        </div >
    )
}
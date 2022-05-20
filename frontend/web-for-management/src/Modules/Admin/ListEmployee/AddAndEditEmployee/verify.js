import React, { useState } from 'react';
import './verify.css';
import InputWithValidate from '../../../../shared/Layout/InputWithValidate';
import { validateIdCode, validatePassword, validatePhone } from '../../../../shared/utils/Validate';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
function Verify_info({ infor, callBack }) {
    console.log(infor)
    const [isApprove, setApprove] = useState(false)
    const [needValidate, setValidate] = useState(1)
    const [isLoading, setLoading] = useState(false)
    return (
        <div className="pops-up-menu-verify">
            <div id="head-verify">
                <button type="button" className="button1-verify"
                    onClick={() => { callBack() }}
                />
                <h1>Verify</h1>
            </div>
            {/* right menu  start*/}
            <div className="right-menu-verify">
                <h2>Account</h2>
                <form name="employee">
                    <div class="row-verify">
                        <div class="col-verify">
                            <label class="lab-verify" htmlFor="name">Name</label><br />
                            <InputWithValidate
                                disable={true}
                                className="left"
                                elementId="name"
                                // callBack={value => updateInfo({ ...info, name: value })}
                                validate={validateString} // Luôn đúng 
                                needValidateState={needValidate}
                                message=""
                                valueState={infor.name}
                                stylesMessage={{
                                    paddingLeft: 20,
                                }}
                                styles={{
                                    marginBottom: 15,
                                }}
                            />
                        </div>
                        <div class="col-verify">
                            <label class="lab-verify" htmlFor="id-code">Indentify Code</label><br />
                            <InputWithValidate
                                disable={true}
                                className="left-verify"
                                elementId="id-code"
                                // callBack={value => updateInfo({ ...info, identifyNumber: value })}
                                validate={validateIdCode}
                                needValidateState={needValidate}
                                message=""
                                valueState={infor.identifyNumber}
                                stylesMessage={{
                                    paddingLeft: 20,
                                }}
                                styles={{
                                    marginBottom: 15,
                                }}
                            />
                        </div>
                    </div>
                    <div className="row-verify">
                        <div class="col-verify">
                            <label class="lab-verify" htmlFor="userName">Email</label><br />
                            <InputWithValidate
                                disable={true}
                                elementId="username"
                                // callBack={value => updateInfo({ ...info, userName: value })}
                                validate={validateString} // Luôn đúng 
                                needValidateState={needValidate}
                                message=""
                                valueState={infor.email}
                                stylesMessage={{
                                    paddingLeft: 20,
                                }}
                                styles={{
                                    marginBottom: 15,
                                }}
                            />
                        </div>
                        <div class="col">
                            <label class="lab-verify" htmlFor="phoneNumber">Phone number</label><br />
                            <InputWithValidate
                                disable={true}
                                elementId="phoneNumber"
                                // callBack={value => updateInfo({ ...info, phoneNumber: value })}
                                validate={validatePhone} // Luôn đúng 
                                needValidateState={needValidate}
                                message=""
                                valueState={infor.phoneNumber}
                                stylesMessage={{
                                    paddingLeft: 20,
                                }}
                                styles={{
                                    marginBottom: 15,
                                }}
                            />
                        </div>
                    </div>
                    <div class="row-verify">
                        <div class="col-verify">
                            <label class="lab-verify" htmlFor="password">Resident Number</label><br />
                            <InputWithValidate
                                disable={true}
                                elementId="residentNumber"
                                // callBack={value => updateInfo({ ...info, password: value })}
                                validate={validatePassword} // Luôn đúng 
                                needValidateState={needValidate}
                                message=""
                                valueState={infor.residentID || infor.residentNumber}
                                stylesMessage={{
                                    paddingLeft: 20,
                                }}
                                styles={{
                                    marginBottom: 15,
                                }}
                            />

                        </div>
                        <div class="col-verify">
                            <label class="lab-verify" htmlFor="status">Status</label>
                            <div id="statusdiv">
                                <div class={(isApprove) ? "status" : "unstatus"} onClick={() => setApprove(true)}>Approve</div>
                                <div class={(!isApprove) ? "status" : "unstatus"} onClick={() => setApprove(false)}>Reject</div>
                            </div>
                        </div>
                    </div>

                    <div class="row-verify">
                        <div class="col-verify">
                            <label class="lab-verify" htmlFor="status" style={{ opacity: 0 }}>Status</label>
                            <div id="statusdiv">
                                <div class={(isApprove) ? "status" : "unstatus"} style={{ opacity: 0, cursor: "context-menu" }} onClick={() => setApprove(true)}>Approve</div>
                                <div class={(!isApprove) ? "status" : "unstatus"} style={{ opacity: 0, cursor: "context-menu" }} onClick={() => setApprove(false)}>Reject</div>
                            </div>
                        </div>
                        <div class="col-verify" id="statusdiv">
                            <button type="button" id="save-verify"
                                onClick={async () => {
                                    if (isApprove) {
                                        setLoading(true)
                                        const token = localStorage.getItem("token")
                                        const url = "https://nmcnpm.herokuapp.com/api/v1/user/activate/" + infor._id
                                        console.log(url)
                                        axios.post(url, {}, { headers: { "Authorization": `Bearer ${token}` } })
                                            .then(res => {
                                                console.log(res.data)
                                                alert("Account active successful")
                                                setLoading(false)
                                                callBack()
                                            }).catch(function (error) {
                                                alert("Something wrong in process")
                                                setLoading(false)
                                            });
                                    } else {
                                        callBack()
                                    }
                                }}
                            >
                                {
                                    (isLoading) ? <HashLoader color="white" /> : <div>Confirm</div>
                                }
                            </button>
                        </div>
                    </div>
                    {/* </div> */}
                </form>
            </div>
            {/* right menu  end*/}

        </div>
    );
}
function validateString(value) {
    if (value == "") { return "This field is required" } else return ""
}
export default Verify_info;

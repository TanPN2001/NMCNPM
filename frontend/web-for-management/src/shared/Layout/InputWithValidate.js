import React, { useEffect, useState } from 'react';

function InputWithValidate({ password, valueState, className, elementId, validate, callBack, needValidateState, message, stylesMessage, styles, disable, name }) {
    const [needValidate, setNeedValidate] = useState(needValidateState) // trigger when parent call validate
    const [validateMessage, setMessage] = useState("")
    useEffect(() => {
        if (needValidateState != 1) {
            const getMessage = validate(value)
            setMessage(getMessage)
            setNeedValidate(needValidateState)
        }
        if (message != "") {
            setMessage(message)
        }
    }, [needValidateState, message])
    const [value, setValue] = useState(valueState)
    return <div style={styles}>
        <input className={className} type={(password) ? "password" : "text"} id={elementId} name={name} onChange={event => {
            setValue(event.target.value)
            callBack(event.target.value) // update info  to parent
        }} value={value}
            disabled={disable}
        />
        {
            (needValidate != 1 && validateMessage != "") && <div style={{ width: 450, marginLeft: 10, color: "red", fontWeight: "bold", ...stylesMessage }}>{validateMessage}</div>
        }
    </div>

}
export default InputWithValidate

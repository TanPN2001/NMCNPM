import React, { useState } from 'react';
import './Pay.css';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import axios from 'axios';
import { TextField } from '@mui/material';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix=",000đ"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function AddMoney({ chosen, cancelAddMoney, fetch }) {

  async function addMoneyUser(id, values) { 
    const token = localStorage.getItem("token")
    const url = 'https://nmcnpm.herokuapp.com/api/v2/user/balance/add/' + id;
    console.log(values)
    await axios.post(url, { balance: values }, {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then(res => {
        if (res.data.status == "success") {
          console.log(res)
          window.confirm("Adding successfull");
          cancelAddMoney();
          fetch();
        } else {
          window.confirm(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  const [values, setValues] = useState({
    numberformat: '',
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  // test
  const infor = {
    name: chosen.name,
    identifyNumber: chosen.identifyNumber,
    balance: chosen.balance,
    phoneNumber: chosen.phoneNumber,
  }

  return (
    <div className="popsup-pay-long">
      {/* header start */}
      <div className="header-pay-long">Add money to your account</div>
      {/* header end */}
      <div className="title-pay-long">Account Info</div>
      {/* cotent start */}
      <div className="content-pay-long">
        {/* show info start */}
        <div className="row-pay-long">
          <div className='col-pay-long'>
            <label >Indentify Number</label>
            <input disabled={true} value={infor.identifyNumber}></input>
          </div>
          <div className='col-pay-long'>
            <label >Name</label>
            <input disabled={true} value={infor.name}></input>
          </div>
        </div>
        <div className="row-pay-long">
          <div className='col-pay-long'>
            <label >Balance</label>
            <input disabled={true} value={infor.balance}></input>
          </div>
          <div className='col-pay-long'>
            <label >Phone Number</label>
            <input disabled={true} value={infor.phoneNumber}></input>
          </div>

        </div>
        {/* show info end */}

        <div id="bottom-enter-amount">
          <div className="row-pay-long title-pay-long">Enter the amount you wanna add to the account</div>
          {/* Nạp tiền start */}
          <div className="row-pay-long" id="row-entermoney-long">
            <form>
              <TextField
                id="input-text"
                // label="Enter the amount here"
                value={values.numberformat}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                placeholder="Enter the amount here"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
            </form>
          </div>
          {/* Nạp tiền end */}

          {/* OK */}
          <div className="row-pay-long" id="pay-back-long">
            <button type="button" onClick={() => {
              const money = parseInt(values.numberformat)*1000;
              addMoneyUser(chosen._id, money); 
            }
            }>OK</button>
            <button type="button" style={{ backgroundColor: '#959494' }} onClick={() => cancelAddMoney()
            }>Cancel</button>
          </div>
        </div>
      </div>
      {/* content end */}
    </div>
  );
}


export default AddMoney;
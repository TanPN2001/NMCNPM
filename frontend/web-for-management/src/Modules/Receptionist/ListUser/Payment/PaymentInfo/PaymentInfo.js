import React  from 'react';
import './PaymentInfo.css';
export default function PaymentInfo({ 
    // infor, 
    callBack }) {
        
        // test
    const infor ={
        identifyNumber: '1234',
        email:"vjppro@gmail.com",
        username:'username',
        phoneNumber:'098838583',
        address:'Hà Nội',
        name:'Dân chơi xóm'
    }
    
  console.log(infor)
  return (<div class = "popsup-showinfo-long">
      {/* header start */}
      <div class = "header-showinfo-long">Your Information</div>
      {/* header end */}

      {/* cotent start */}
      <div class = "content-showinfo-long">
          <div class = "row-showinfo-long">
              <div class ='col-showinfo-long'>
                  <label >Indentify Number</label>
                  <input disabled="true" value={infor.identifyNumber}></input>
              </div>
              <div class ='col-showinfo-long'>
                  <label >Name</label>
                  <input disabled="true" value={infor.name}></input>
              </div>
          </div>
          <div class = "row-showinfo-long">
              <div class ='col-showinfo-long'>
                  <label >User Name</label>
                  <input disabled="true" value={infor.username}></input>
              </div>
              <div class ='col-showinfo-long'>
                  <label >Phone Number</label>
                  <input disabled="true" value={infor.phoneNumber}></input>
              </div>
          </div>
          <div class = "row-showinfo-long">
              <div class ='col-showinfo-long'>
                  <label >Address</label>
                  <input disabled="true" value={infor.address}></input>
              </div>
              <div class ='col-showinfo-long'>
                  <label >Email</label>
                  <input disabled="true" value={infor.email}></input>
              </div>
          </div>
          <div class="row-showinfo-long" id="showinfo-back-long">
              <button type="button"  onClick={() => { callBack() }}>OK</button>
          </div>
      </div>
      {/* content end */}

  </div>
   
  );
}

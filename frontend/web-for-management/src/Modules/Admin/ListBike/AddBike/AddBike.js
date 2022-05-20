import { useEffect, useState } from 'react';
import './AddBike.css'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios';
import { addBikeService } from '../../../../Services/AdminService';

function AddBike({ callBackCancel, refresh, setRefresh }) {
    const [stationList, setStationList] = useState([])
    const [modelList, setModelList] = useState([])

    const testData = (data) => {
        let xd = true;
        data.map( one => {
            if (one.model === null || (one.station === null)) xd = false;
            if ((isNaN(one.number)) || (one.number === null)) xd = false;
                else if (one.number <= -1) xd = false;
        })
        return xd;
    }

    async function getDataStation(url) {
        const token = localStorage.getItem("token")
        await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                setStationList(res.data.data);
            })
    }

    async function getDataModel(url) {
        const token = localStorage.getItem("token")
        await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                setModelList(res.data.data);
            })
    }

    const handleSave = async()=>{
        const result = await addBikeService(rownumber);
        if(result.status==="success"){
            alert(result.msg);
            setRefresh(refresh+1)
            callBackCancel()
        }else{
            alert(result.msg)
        }
        
    }
    
    useEffect(() => {
        getDataStation("https://nmcnpm.herokuapp.com/api/v2/station")
        getDataModel("https://nmcnpm.herokuapp.com/api/v2/category")
    }, [])

    const morerow = () => {
        setRownumber([...rownumber, data]);
    }

    const data = {
        model: null,
        station: null,
        number: null,
    }
    const [rownumber, setRownumber] = useState([data]);
    return (
        <div className="form-add-bike">
            <h1 className='h1inaddbike'>Thêm</h1>
            <FaTimes className="cancel"
                onClick={() => {
                    callBackCancel();
                }}
            ></FaTimes>
            <table className="table-add-bike">
                <thead>
                    <tr>
                        <th className="th-table-add" style={{ paddingRight: '175px', paddingLeft:'175px' }}>Model</th>
                        <th className="th-table-add" style={{ paddingRight: '90px', paddingLeft:'90px' }}>Station</th>
                        <th className="th-table-add" style={{ paddingRight: '60px', paddingLeft:'60px' }}>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {rownumber.map((row, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <div class="select" >
                                        <select name="format" id="format"
                                            onChange={(event) => {
                                            row.model = event.target.value;
                                        }}>
                                            <option selected disabled>Choose a model</option>
                                            {modelList.map((model, index) => {
                                                return (
                                                    <option key={index} value={model._id}>{model.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div class="select">
                                        <select name="format" id="format"
                                            onChange={(event) => {
                                            row.station = event.target.value;
                                        }}>
                                            <option selected disabled>Choose a station</option>
                                            {stationList.map((station, index) => {
                                                return (
                                                    <option key={index} value = {station._id}>{station.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </td>
                                <td><input type="text"
                                    onChange={(event) => {
                                        row.number = event.target.value;
                                    }}
                                ></input></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <div className="bottom-button">
                <button id="Delete" onClick={() => {
                    if (testData(rownumber)) handleSave();
                        else alert("Hãy kiểm tra lại thông tin");
                }}>Lưu</button>
                <button id="Delete" onClick={() => morerow()}>Thêm</button>
            </div>
        </div>
    )
}

export default AddBike;

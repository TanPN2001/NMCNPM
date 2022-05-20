import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { useState } from "react";
import { updateReturnData } from "../Store/ListCategoryStore";

const useStyles = makeStyles({
    root: {
        position: "fixed",
        width: "1200px",
        height: "720px",
        backgroundColor: "#fff",
        top: "200px",
        left: "550px",
        borderRadius: "20px",
        display: 'grid',
        gridTemplateColumns: "auto auto",
        gridTemplateRows: "120px 120px 120px 120px 120px 120px",
        gridTemplateAreas:
            `'title title'
        'renderName image'
        'bikeCategory image'
        'licensePlates startStation'
        'none timeRegister'
        'confirmBtn rejectBtn'`,
        zIndex:1
    },
    inputItem: {
        alignSelf: "center",
        justifySelf: "center"
    },
    title: {
        gridArea: "title",
        '& h4':{
            paddingLeft:"5%"
        },
        '& h2':{
            margin:0
        }
    },
    image: {
        gridArea: "image",
        justifySelf:"center",
        border:"2px solid blue",
        borderRadius:"5px"
    },
    renderName: {
        gridArea: "renderName"
    },
    bikeCategory: {
        gridArea: "licensePlates"
    },
    status: {
        gridArea: "timeRegister"
    },
    startStation:{
        gridArea:"startStation"
    }
    ,
    confirmBtn: {
        gridArea: "confirmBtn",
        alignSelf:"center",
        justifySelf:"center"
    },
    rejectBtn: {
        gridArea: "rejectBtn",
        alignSelf:"center",
        justifySelf:"center"
    },
})
export default function ReturnConfirm({ data, setReturnData, socket }) {
    const classes = useStyles();
    const [status, setStatus]=useState('Free');
    const handleConfirm = async () => {
        var dateTime= Date.now();
        console.log(status)
        const result = await updateReturnData({billID: data.idBill, time: dateTime, status:status})
        console.log(result);
        socket.emit("return_confirm", data.socket_id, { data:result , returnTime: dateTime})
        setReturnData(null)
    }

    const handleChange=(event)=>{
        setStatus(event.target.value);
    }

    const handleReject=()=>{
        socket.emit("return_confirm", data.socket_id, { data: {status:"fail", msg:"station reject" }})
        setReturnData(null)
    }
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <h2>Verify bicycle return confirm</h2>
                <h4>Information</h4>
            </div>
            <div className={classes.image}>
                <img 
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ride-girls-bikes-1638798553.jpg?resize=980:*"
                alt="Bike" width="400px" height="235px" />
            </div>
            <div className={[classes.renderName, classes.inputItem].join(' ')}>
                <TextField
                    id="outlined-basic"
                    label="Render's name"
                    variant="outlined"
                    value={data.renderName}
                    style={{
                        width: "400px",
                    }}
                    InputProps={{
                        readOnly: true,
                      }}

                     />
            </div>
            <div className={[classes.bikeCategory, classes.inputItem].join(' ')}>
                <TextField 
                id="outlined-basic"
                 label="Bike category" 
                 variant="outlined"
                value={data.bikeCategory.name}
                 style={{
                    width: "400px",
                }}
                InputProps={{
                    readOnly: true,
                  }} />
            </div>
            <div className={[classes.licensePlate, classes.inputItem].join(' ')}>
                <TextField 
                id="outlined-basic"
                 label="License Plates"
                  variant="outlined"
                  value={data.licensePlate}
                  style={{
                    width: "400px",
                }}
                InputProps={{
                    readOnly: true,
                  }}
                 />
            </div>
            <div className={[classes.startStation, classes.inputItem].join(' ')}>
                <TextField 
                id="outlined-basic"
                 label="Start Station"
                  variant="outlined"
                  value={data.stationName}
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{
                    width: "400px",
                }}
                 />
            </div>
            <div className={[classes.status, classes.inputItem].join(' ')}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Hello"
                value={status}
                onChange={handleChange}
                style={{
                    width:"400px"
                }}
            >
                <MenuItem value={"Free"}>Free</MenuItem>
                <MenuItem value={"Breakdown"}>Breakdown</MenuItem>
            </Select>
            </div>
            <div className={classes.confirmBtn}>
                <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
            </div>
            <div className={classes.rejectBtn}>
            <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>
            </div>
        </div>
    )
}
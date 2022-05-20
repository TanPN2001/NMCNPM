import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { timeConverter } from "../../../shared/utils/ConvertTime";
import { updateTime } from "../Store/ListCategoryStore";

const useStyles = makeStyles({
    root: {
        position: "fixed",
        width: "1200px",
        height: "600px",
        backgroundColor: "#fff",
        top: "200px",
        left: "550px",
        borderRadius: "20px",
        display: 'grid',
        gridTemplateColumns: "auto auto",
        gridTemplateRows: "120px 120px 120px 120px 120px",
        gridTemplateAreas:
            `'title title'
        'renderName image'
        'bikeCategory image'
        'licensePlates timeRegister'
        'confirmBtn rejectBtn'`,
        zIndex: 1
    },
    inputItem: {
        alignSelf: "center",
        justifySelf: "center"
    },
    title: {
        gridArea: "title",
        '& h4': {
            paddingLeft: "5%"
        },
        '& h2': {
            margin: 0
        }
    },
    image: {
        gridArea: "image",
        justifySelf: "center",
        border: "2px solid blue",
        borderRadius: "5px"
    },
    renderName: {
        gridArea: "renderName"
    },
    bikeCategory: {
        gridArea: "licensePlates"
    },
    timeRegister: {
        gridArea: "timeRegister"
    },
    confirmBtn: {
        gridArea: "confirmBtn",
        alignSelf: "center",
        justifySelf: "center"
    },
    rejectBtn: {
        gridArea: "rejectBtn",
        alignSelf: "center",
        justifySelf: "center"
    }
})


export default function RentalConfirm({ data, setRental, socket }) {
    const classes = useStyles();
    const handleConfirm = async () => {
        var dateTime= Date.now();
        const result = await updateTime({billID: data.idBill, time: dateTime})
        console.log(result);
        socket.emit("rent_confirm", data.socket_id, { data:result , startTime: dateTime})
        setRental(null)
        
        
    }

    const handleReject = () => {
        socket.emit("rent_confirm", data.socket_id, { data: {status:"fail", msg:"station reject" }})
        setRental(null)
    }

    return (
        <div style={{
            position:"relative",
            backgroundColor:"black",
            width:"100%",
            height:"100%"
        }}>
        <div className={classes.root}>
            <div className={classes.title}>
                <h2>Bicycle rental authentication</h2>
                <h4>Information</h4>
            </div>
            <div className={classes.image}>
                <img
                    src={data.image}
                    alt="Bike" width="400px" height="235px" />
            </div>
            <div className={[classes.renderName, classes.inputItem].join(' ')}>
                <TextField
                    id="outlined-basic"
                    label="Render's name"
                    variant="outlined"
                    color="info"
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
                    }}
                />
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
            <div className={[classes.timeRegister, classes.inputItem].join(' ')}>
                <TextField
                    id="outlined-basic"
                    label="Time Register"
                    variant="outlined"
                    value={timeConverter(data.timeRegister)}
                    style={{
                        width: "400px",
                    }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </div>
            <div className={classes.confirmBtn}>
                <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
            </div>
            <div className={classes.rejectBtn}>
                <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>
            </div>
        </div>
        </div>
    )
}
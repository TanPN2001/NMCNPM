import { useEffect, useState } from "react"
import { makeStyles } from "@mui/styles"
import SearchBike from "./SearchBar/index"
import Details from "./Details"
import History from "./History";
import socketClient from "socket.io-client";
import RentalConfirm from "./RentalConfirm";
import ReturnConfirm from "./ReturnConfirm";
const useStyles = makeStyles({
    root: {

    },
    workHistory: {
        borderRadius:"40px",
        display: "grid",
        width: "98%",
        gridTemplateRows: "1fr 3fr",
        justifyItems: "center",
        margin: "10% 0 0 30px",
        backgroundColor: "#fff",
        minHeight: "800px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    }
})

export default function BikeConfirm({staff}) {
    const classes = useStyles();
    const socket = socketClient('http://3137-27-67-92-150.ngrok.io');
    const [rental, setRental] = useState(null);
    const [room, setRoom] = useState(null)
    const [returnData, setReturnData] = useState(null);
    let station = JSON.parse(localStorage.getItem("station"))
    let stationID= station?._id
    useEffect(() => {
        console.log(rental)
        if (rental === null && returnData === null) {
            console.log(stationID)
            console.log(stationID)
            socket.emit("create", stationID)
        }
    }, [rental, returnData])
    socket.on("rent", (data) => {
        console.log(data)
        setRental(data);
        setReturnData(null);
        socket.emit("leave", stationID);
    });
    socket.on("return", (data) => {
        setReturnData(data);
        setRental(null);
        socket.emit("leave", stationID);
    });


    return (
        <div>
            {!returnData && rental && <RentalConfirm data={rental} setRental={setRental} socket={socket} />}
            {returnData && !rental && <ReturnConfirm data={returnData} setReturnData={setReturnData} socket={socket} />}
            <SearchBike />
            <div className={classes.workHistory}>
                <Details />
                <History />
            </div>
        </div>
    )
}
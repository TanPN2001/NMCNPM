import { Icon } from "@mui/material";
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
    root: {
        width: "93%",
        marginTop: "2%",
        display: "grid",
        borderRadius: "10px",
        gridTemplateColumns: "1fr 1fr",
        backgroundColor: "#F2F1F1",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        
    
    },
    details: {
        padding: "10px 20px",
        '& h5': {
            display: "inline-block",
            width: "30%",
            margin: "0px",
            fontSize:"20px"
        },
        '&> p:nth-child(2)': {
            display: "inline-block",
        },
        '&> p:nth-child(3)': {
        },
    },
    icon: {
        backgroundColor: "#6160DC",
        color: "white",
        borderRadius: "20px",
        height: "40px",
        width: "40px",
        padding: "7px 0px 0px 7px",
        marginTop: "4px"
    },
    stationDetail: {
    },
    managerDetail: {
        borderLeft: "1px solid black",
        
    },
    bikeDetails: {
        display: "grid",
        gridTemplateColumns: "1fr 5fr",
        marginLeft: "-30px",
        marginTop: "4%",
        marginBottom: "4%",
        '&> span':{
            justifySelf:"center"
        }
    },
    bikeOut: {
    },
    bikeIn: {
    },

})

export default function Details() {
    const station= JSON.parse(localStorage.getItem("station"))
    const info = JSON.parse(localStorage.getItem("info"));
    let today = new Date()
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+ today.getFullYear();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.details}>
                <h5 style={{paddingTop:"10px", paddingBottom:"5px"}}>{station?.name}</h5>
                <p></p>
                <p>This is address</p>
                <div className={classes.bikeDetails}>
                    <Icon className={classes.icon}>
                        directions_bike_circle
                    </Icon>
                    <div>
                        <p>The number of bicycle going in today</p>
                        <p>20bikes</p>
                    </div>
                </div>
            </div>
            <div className={[classes.details, classes.managerDetail].join(' ')}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between",
                }}>
                <h5 style={{paddingTop:"10px", paddingBottom:"5px"}} >{info?.name}</h5>
                <p style={{
                    fontWeight: "bold",
                    marginRight:"20px"
                }}>Today is {date}</p>
                </div>
                <p>Staff In Ecopark Bike Renting</p>
                <div className={classes.bikeDetails}>
                    <Icon className={classes.icon}>
                        directions_bike_circle
                    </Icon>
                    <div>
                        <p>The number of bicycle going out today</p>
                        <p>20bikes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
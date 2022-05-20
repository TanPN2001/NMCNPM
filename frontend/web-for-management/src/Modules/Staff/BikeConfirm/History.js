import { Icon } from "@mui/material";
import { makeStyles } from "@mui/styles"
import { useEffect } from "react";
import { rentReturnBike } from "../Store/ListCategoryStore";

const useStyles = makeStyles({
    root: {
        width: "93%",
        margin: "3% 0 3% 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "5%",
        


    },
    bikeHistory: {
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        backgroundColor: "#F2F1F1",
        borderRadius: "24px",
        display: "grid",
        gridTemplateRows: "10% 30% 60%",
        '&> div:nth-child(2)': {
            display: "grid",
            justifyItems: "center",
            '& img': {
                display: "block",
                width: "200px",
                height: "100%",
                border:"1px solid #D4D3D3",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                borderRadius: "4px"
            }
        },
        '&> p:nth-child(1)': {
            fontSize: '18px',
            fontWeight: 'bold',
            padding: "10px 31px"
        }

    },
    billDetails: {
        display: "grid",
        padding: "4%",
        gridTemplateRows: "20% 90%",
        '&> p': {
            textAlign: "center",
            fontSize: "24px",
            fontFamily: "Inter",
            color: "#8E8EA1"
        },
        '&> div': {
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gridGap: "10px",
            justifyItems: "center",
            "& div": {

            }
        }
    },
    historyDetails: {

        '&> p': {
            fontSize: "18px",
            fontFamily: "Inter",
            color: "#8E8EA1",

        },
        '& div': {
            padding: "5px 0px",
        },
        '& div span': {
            display: "inline-block",
            paddingTop: "2px"

        },
        '& div p': {
            display: "inline-block",
            marginLeft: "5px",
            fontWeight: "600"
        }
    },
    rentBikeCategory: {
        '& div p': {
            color: "#008000"
        }
    },
    startingStationRegister: {
        '& div p': {
            color: "#0000FF"
        }
    },
    licensePlate: {
        '& div p': {
            color: "#FF0000"
        }
    },
    timeReturnRent: {
        '& div p': {
            color: "#000000"
        }
    },
})


export default function History() {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <div className={classes.bikeHistory}>
                <p>Information about the nearest bicycle to enter</p>
                <div>
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ride-girls-bikes-1638798553.jpg?resize=980:*" alt="xe dap" />
                </div>
                <div className={classes.billDetails}>
                    <p>Renter: Tran Kim Hung</p>
                    <div>
                        <div className={[classes.historyDetails, classes.rentBikeCategory].join(' ')}>
                            <p>Bike Category</p>
                            <div>
                                <Icon
                                    color="primary"
                                    fontSize="small"
                                    sx={{ marginRight: "2px", color: "#008000" }}
                                >
                                    directions_bike
                                </Icon>
                                <p>FX3 DISC</p>
                            </div>
                        </div>

                        <div className={[classes.historyDetails, classes.startingStationRegister].join(' ')}>
                            <p>Starting Station</p>
                            <div>
                                <Icon
                                    color="primary"
                                    fontSize="small"
                                    sx={{ marginRight: "2px"     }}
                                >
                                    directions_bike
                                </Icon>
                                <p>FX3 DISC</p>
                            </div>
                        </div>

                        <div className={[classes.historyDetails, classes.licensePlate].join(' ')}>
                            <p>LicensePlate</p>
                            <div>
                                <Icon
                                    color="primary"
                                    fontSize="small"
                                    sx={{ marginRight: "2px", color:"#FF0000" }}
                                >
                                    directions_bike
                                </Icon>
                                <p>FX3 DISC</p>
                            </div>
                        </div>

                        <div className={[classes.historyDetails, classes.timeReturnRent].join(' ')}>
                            <p>Time return the bike</p>
                            <div>
                                <Icon
                                    color="primary"
                                    fontSize="small"
                                    sx={{ marginRight: "2px", color:"#000000" }}
                                >
                                    directions_bike
                                </Icon>
                                <p>FX3 DISC</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.bikeHistory}>
                <p>Information about the nearest bicycle to enter</p>
                <div>
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ride-girls-bikes-1638798553.jpg?resize=980:*" alt="xe dap" />
                </div>
                <div className={classes.billDetails}>
                    <p>Renter: Tran Kim Hung</p>
                    <div>
                        <div className={[classes.historyDetails, classes.rentBikeCategory].join(' ')}>
                            <p>Bike Category</p>
                            <div>
                                <Icon
                                    color="primary"
                                    fontSize="small"
                                    sx={{ marginRight: "2px", color:"#008000" }}
                                >
                                    directions_bike
                                </Icon>
                                <p>FX3 DISC</p>
                            </div>
                        </div>

                        <div className={[classes.historyDetails, classes.startingStationRegister].join(' ')}>
                            <p>Time register the bike</p>
                            <div>
                                <Icon
                                    color="primary"
                                    fontSize="small"
                                    sx={{ marginRight: "2px" }}
                                >
                                    directions_bike
                                </Icon>
                                <p>FX3 DISC</p>
                            </div>
                        </div>

                        <div className={[classes.historyDetails, classes.licensePlate].join(' ')}>
                            <p>LicensePlate</p>
                            <div>
                                <Icon
                                    color="primary"
                                    fontSize="small"
                                    sx={{ marginRight: "2px", color:"#FF0000" }}
                                >
                                    directions_bike
                                </Icon>
                                <p>FX3 DISC</p>
                            </div>
                        </div>

                        <div className={[classes.historyDetails, classes.timeReturnRent].join(' ')}>
                            <p>Time rent the bike</p>
                            <div>
                                <Icon
                                    color="primary"
                                    fontSize="small"
                                    sx={{ marginRight: "2px", color:"#000000" }}
                                >
                                    directions_bike
                                </Icon>
                                <p>FX3 DISC</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
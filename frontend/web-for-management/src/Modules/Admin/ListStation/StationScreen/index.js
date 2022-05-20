import { Button, Container, Grid, Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { deleteStation, getByID, getStation } from "../../Store/ListStationStore";
import Detail from "./Detail";
import ListBikeCategory from "./ListBikeCategory";
import ListStation from "./ListStation";


export default function ListStationScreen({ stations, setEditing, setChosenStation, chosenStation, needLoading, setNeedLoading }) {
    useEffect(() => {
        const getChosenStation = async () => {
            if (stations.length > 0) {
                const station = await getByID(stations[0]._id)
                setChosenStation(station)
            }
        }
        getChosenStation();
    }, [])
    
    const handleDelete= async()=>{
        const result = await deleteStation(chosenStation.id);
        if(result!=="Failed to delete"){
            setNeedLoading(needLoading+1);
            alert(result.msg);
        }else{
            alert(result)
        }
    }

    return (
        <Box style={{
            backgroundColor: "white",
            background: "white",
            height: "900px",
            borderRadius: "40px",
            paddingTop: "30px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}>
            <Grid container direction="row" >
                <Grid container item xs={4}>
                    <ListStation stations={stations} setChosenData={setChosenStation} />
                </Grid>
                <Grid container item xs={8} sx={{}} >
                    <Box>
                        <Grid container direction="column" spacing={2} style={{ backgroundColor: "#ffff", borderRadius: "40px", marginTop: "4%" }}>
                            <Grid container item >
                                {chosenStation ? (<Detail details={chosenStation} />) : (<div style={{ paddingLeft: 100 }}><PropagateLoader color="#6160DC" /></div>)}
                            </Grid>
                            <Grid container item sx={{ height: "55.5vh" }}>
                                {chosenStation ? (<ListBikeCategory bikeCategories={chosenStation.listBikeCategory} />) : (<div style={{ paddingLeft: 100 }}><PropagateLoader color="#6160DC" /></div>)}
                            </Grid>
                            <Grid container direction="row" item style={{ marginBottom: "1%", marginTop: "-70px", marginLeft: "110px" }}>
                                <Grid item sx={{ paddingLeft: "160px", paddingRight: "40px" }}>
                                    <Button id="Newmember" style={{filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",}} onClick={()=>{setEditing(true)}}>Edit</Button>
                                </Grid>
                                <Grid item  >
                                    <Button id="Newmember" style={{filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",}} onClick={handleDelete}>Delete</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
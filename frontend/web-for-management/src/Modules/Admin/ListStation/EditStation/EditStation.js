import * as React from 'react';
import { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { Container, Grid, Button, Typography, TextField, Select, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { editingStation, getLocations, getStaffs, postData } from '../../../../Services/StaffService';
import AddLocation from '../AddStation/AddLocation/AddLocation';

const useStyles = makeStyles({
    container: {
        width: "1253px",
        height: "632px",
        left: "calc(1253px/2.5)",
        top: "calc(432px/2.5)",
        borderRadius: "40px",
        border: 'solid',
        backgroundColor: 'white',
        position: "absolute",
        zIndex: 2,
    },
    header: {
        height: "6%",
        marginTop: "1%",
        marginLeft: "0%",
    },
    content: {
        width: "100%",
        height: "90%",
        marginTop: "0%",
        marginLeft: "0%",
    }
})

export default function EditStation({ stationInfo, needLoading, setEditing, setNeedLoading }) {
    const [addLocation, SetAddLocation] = useState(false)
    const [needUpdate, setNeedUpdate] = useState(1)
    const [listLocation, setListLocation] = useState([])
    const [listManager, setListManager] = useState([])
    const [isLoading, setLoading] = useState(true)
    const classes = useStyles()
    const [station, setStation] = useState({
        name: stationInfo.stationName,
        phoneNumber: stationInfo.hotLine,
        staffID: stationInfo.staffID,
        locationID: stationInfo.locationID,
        locationIndex: -1,
        staffIndex: -1,
    })

    async function editStation(data) {
      console.log(stationInfo)
       const res = await editingStation(data, stationInfo.id)
       if(res.status==="success"){
        alert("Update successfully")
        setNeedLoading(needLoading+1);
        setEditing(false)
       }else{
         alert(res.msg);
       }
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        setStation({ ...station, [name]: value })
    }
    useEffect(() => {
        async function getData() {
            const locations = await getLocations()
            const staffs = await getStaffs()
            var sIndex, lIndex
            for (var i = 0; i < locations.data.length; i++) {
                if (locations.data[i]._id === station.locationID) {
                    lIndex = i + 1
                }
            }
            for (var i = 0; i < staffs.data.length; i++) {
                if (staffs.data[i].staffID === station.staffID) {
                    sIndex = i + 1
                }
            }
            setStation({ ...station, staffIndex: sIndex, locationIndex: lIndex })
            setListLocation(locations.data)
            setListManager(staffs.data)
            setLoading(false)
        }
        getData()

        return () => {
        }
    }, [needUpdate])

    if (!isLoading)
        return (
            <Container container className={classes.container} direction="column">
                <Grid container className={classes.header} direction="row" justifyContent="flex-start" alignItems="center">
                    <Button variant='text' startIcon={<ArrowBackIcon sx={{ color: "black", height: "40px", width: "40px" }} />} onClick={() => setEditing(false)}>
                    </Button>
                    <Typography variant="h4">Edit Station</Typography>
                </Grid>
                {
                    addLocation && <AddLocation setAddLocation={SetAddLocation} needUpdate={needUpdate} setNeedUpdate={setNeedUpdate}></AddLocation>
                }
                <Grid container className={classes.content} direction="column" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginTop: "2%", marginBottom: "2%" }}>
                    <Grid container justifyContent="flex-start" alignItems="center" item xs={1} sx={{ marginLeft: "3%" }}>
                        <Typography variant="h5">Station Info</Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="center" alignItems="center" item xs={4} spacing={2} sx={{ marginLeft: "6%"}}>
                        <Grid container xs={6} direction="column" justifyContent="space-around" rowGap={2}>
                            <Typography variant="h6">Name</Typography>
                            <TextField id="outlined-basic" placeholder="Name" variant="outlined" sx={{maxWidth: "70%"}}
                                name='name' value={station.name} onChange={handleChange}
                            />
                        </Grid>
                        <Grid container xs={6} direction="column" justifyContent="space-around" rowGap={2}>
                            <Typography variant="h6">PhoneNumber</Typography>
                            <TextField id="outlined-basic" placeholder="PhoneNumber" variant="outlined" sx={{maxWidth: "70%" }}
                                name='phoneNumber' value={station.phoneNumber} onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="center" alignItems="center" item xs={4} spacing={2} sx={{ marginLeft: "6%" }}>
                        <Grid container xs={6} direction="column" justifyContent="space-around" rowGap={2}>
                            <Typography variant="h6">Manager</Typography>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                defaultValue={station.staffIndex}
                                sx={{ width: "70%" }}
                                name='staffIndex' onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    (listManager !== []) ? listManager?.map((manager, index) => <MenuItem value={index + 1}><em>{manager.name}</em></MenuItem>) : <>Loading...</>
                                }

                            </Select>
                        </Grid>
                        <Grid container xs={6} direction="column" justifyContent="space-around" rowGap={2}>
                            <Typography variant="h6">Location</Typography>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                sx={{ width: "70%" }}
                                name='locationIndex'
                                defaultValue={station.locationIndex}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <Button onClick={() => SetAddLocation(true)} variant="text" sx={{ backgroundColor: "white", width: "100%", height: "100%" }}>Add new location</Button>
                                </MenuItem>
                                {
                                    (listLocation !== []) ? listLocation?.map((location, index) => <MenuItem value={index + 1}><em>{location.name}</em></MenuItem>) : <>Loading...</>
                                }
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-start" alignItems="center" item xs={2}>
                        <Button variant="contained" sx={{ width: "30%", height: "70%", marginLeft: "30%", borderRadius: "40px" }}
                            onClick={() => {
                                const data = {
                                    employee: listManager[station.staffIndex - 1]._id,
                                    place: listLocation[station.locationIndex - 1]._id,
                                    phoneNumber: station.phoneNumber,
                                    name: station.name,
                                }
                                editStation(data)
                            }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        )
    else return <div></div>
}



import * as React from 'react';
import './AddStation.css';
import { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { Container, Grid, Button, Typography, TextField, Select, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addNewStation, getLocationForAdding, getLocations, getStaffForAdding, getStaffs, postData } from '../../../../Services/StaffService';
import AddLocation from './AddLocation/AddLocation';
import zIndex from '@mui/material/styles/zIndex';

const useStyles = makeStyles({
  container: {
    width: "1253px",
    height: "620px",
    left: 500,
    top: "calc(500px/5)",
    borderRadius: "40px",
    border: 'solid',
    backgroundColor: 'white',
    position: "absolute",
    zIndex: "100"
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


export default function AddStation({ setAddStation, setNeedLoading, needLoading }) {
  const [needUpdate, setNeedUpdate] = useState(1)
  const [listLocation, setListLocation] = useState([])
  const [listManager, setListManager] = useState([])
  const classes = useStyles()
  const [addLocation, SetAddLocation] = useState(false)
  const [station, setStation] = useState({
    name: "",
    phoneNumber: "",
    staffID: "",
    locationID: "",
    locationIndex: -1,
    staffIndex: -1,
  })

  async function addData(data) {
    const res = await addNewStation(data)
    if (res.status === "success") {
      alert("Add new station successfully");
      setNeedLoading(needLoading + 1);
      setAddStation(false)
    } else {
      alert(res.msg)
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    setStation({ ...station, [name]: value })

  }

  const showManager = async () => {
    const staffs = await getStaffForAdding()
    setListManager(staffs.data)
    console.log(staffs.data)
  }

  const showLocation = async () => {
    const locations = await getLocationForAdding()
    setListLocation(locations.data)
  }
  return (
    <Container container className={classes.container} direction="column">
      <Grid container className={classes.header} direction="row" justifyContent="flex-start" alignItems="center">
        <Button variant='text' startIcon={<ArrowBackIcon sx={{ color: "black", height: "40px", width: "40px", marginTop:"5px", ":hover":{borderRadius:"30px"} }} />} onClick={() => { setAddStation(false) }}>
        </Button>
        <Typography variant="h4" sx ={{position:"absolute", marginTop:"30px", marginLeft:"63px"}}>Add Station</Typography>
      </Grid>
      {
        addLocation && <AddLocation setAddLocation={SetAddLocation} needUpdate={needUpdate} setNeedUpdate={setNeedUpdate}></AddLocation>
      }
      <Grid container className={classes.content} direction="column" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginTop: "2%", marginBottom: "2%" }}>
        <Grid container justifyContent="flex-start" alignItems="center" item xs={1} sx={{ marginLeft: "3%" }}>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center" item xs={4} spacing={2} sx={{ marginLeft: "6%" }}>
          <Grid container xs={6} direction="column" justifyContent="space-around" rowGap={2}>
            <Typography variant="h6">Name</Typography>
            <TextField id="outlined-basic" placeholder="Name" variant="outlined" sx={{ maxWidth: "70%" }}
              name='name' value={station.name} onChange={handleChange}
            />
          </Grid>
          <Grid container xs={6} direction="column" justifyContent="space-around" rowGap={2}>
            <Typography variant="h6">PhoneNumber</Typography>
            <TextField id="outlined-basic" placeholder="PhoneNumber" variant="outlined" sx={{ maxWidth: "70%" }}
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
              onOpen={showManager}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                (listManager !== []) ? listManager?.map((manager, index) => <MenuItem value={index + 1}><em>{manager.name}</em></MenuItem>) : <></>
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
              onOpen={showLocation}
            >
              <MenuItem value="">
                <Button onClick={() => SetAddLocation(true)} variant="text" sx={{ backgroundColor: "white", width: "100%", height: "100%" }}>Add new location</Button>
              </MenuItem>
              {
                listLocation ? listLocation?.map((location, index) => <MenuItem value={index + 1}><em>{location.name}</em></MenuItem>) : <>Loading...</>
              }
            </Select>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-start"  item xs={2}>
          <Button variant="contained" id = "addbutton-ofaddstation"
            onClick={() => {
              if (station.name === "" ||
                station.phoneNumber === "" ||
                station.locationIndex === "" ||
                station.staffIndex === "") {
                console.log(station.locationIndex)
                console.log(station.staffIndex)
                alert("You need to fill all information")
              }
              else {
                console.log(station.locationIndex)
                console.log(station.staffIndex)
                const data = {
                  employee: listManager[station.staffIndex - 1]._id,
                  place: listLocation[station.locationIndex - 1]._id,
                  phoneNumber: station.phoneNumber,
                  name: station.name,
                }
                addData(data)
              }
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

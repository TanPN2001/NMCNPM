import * as React from 'react';
import { useState } from "react";
import { makeStyles } from '@mui/styles';
import { Container, Grid, Button, Typography, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addNewLocation } from '../../../../../Services/StaffService';

const useStyles = makeStyles({
  container: {
    width: "652px",
    height: "550px",
    left: "calc( 500px/2 )",
    top: "calc(100px/2 )",
    borderRadius: "40px",
    border: 'solid',
    backgroundColor: 'white',
    position: "absolute",
    zIndex: 10,
  },
  header: {
    height: "10%",
    marginTop: "5%",
    marginLeft: "0%",
    marginBottom: "3%",
  },
  content: {
    width: "100%",
    height: "90%",
    marginTop: "0%",
    marginLeft: "0%",
  }
})


export default function AddLocation({ setAddLocation, setNeedUpdate, needUpdate }) {
  const [location, setLocation] = useState({
    name: '',
    longtitude: '',
    latitude: ''
  })
  async function addLocation(location) {
    const res = await addNewLocation(location)
    if (res.status === "success") {
      alert("Update successful!")
      setNeedUpdate(needUpdate+1)
      setAddLocation(false)
    } else {
      alert(res.msg)
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    setLocation({ ...location, [name]: value })
  }

  const classes = useStyles()
  return (
    <Container container className={classes.container} direction="column" sx={{ width: "652px", height: "500px" }}>
      <Grid container className={classes.header} direction="row" justifyContent="flex-start" alignItems="center" >
        <Button onClick={() => { setAddLocation(false) }} variant='text' startIcon={<ArrowBackIcon sx={{ color: "black", height: "40px", width: "40px" }} />}>
        </Button>
        <Typography variant="h4">New Location</Typography>
      </Grid>
      <Grid container className={classes.content} direction="column" justifyContent="flex-start" alignItems="flex-start" rowGap={2} sx={{ marginTop: "4%", marginBottom: "2%", marginLeft: "8%" }}>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" rowGap={1}>
          <Typography variant="h6">Name</Typography>
          <TextField id="outlined-basic" placeholder="Name" variant="outlined" sx={{ maxWidth: "70%", marginLeft: "8%"}}
            name='name' value={location.name} onChange={handleChange}
          />
        </Grid>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" rowGap={1}>
          <Typography variant="h6">Longtitude</Typography>
          <TextField id="outlined-basic" placeholder="Longtitude" variant="outlined" sx={{ maxWidth: "70%", marginLeft: "2px"}}
            name='longtitude' value={location.longtitude} onChange={handleChange}
          />
        </Grid>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" rowGap={1}>
          <Typography variant="h6">Latitude</Typography>
          <TextField id="outlined-basic" placeholder="Latitude" variant="outlined" sx={{ maxWidth: "70%", marginLeft: "5%" }}
            name='latitude' value={location.latitude} onChange={handleChange}
          />
        </Grid>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{ marginTop:"13px"  }}>
          <Button variant="contained" sx={{ width: "30%", height: "100%", marginLeft: "35%", borderRadius: "40px" }}
            id = "savebutton-ofaddlocation"
            onClick={() => {
              addLocation(location)
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}



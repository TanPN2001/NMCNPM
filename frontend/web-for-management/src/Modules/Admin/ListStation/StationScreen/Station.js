import { Button, Card, CardActions, CardContent, Grid, Container, Typography, Avatar, Icon } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, width } from "@mui/system";
import { useEffect } from "react";
import { getByID } from "../../Store/ListStationStore";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fffff",
    height: "210px",

  },
  list: {
    backgroundColor: '#E7EAED',

  }
})

export default function Station({ data, setChosenData }) {
  const classes = useStyles()
  const handleClick = async () => {
   const chosenData= await getByID(data._id)
   setChosenData(chosenData)
  }
  return (
    <Box className={classes.root}  >
      <Card style={{ borderRadius: "30px", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", paddingLeft: "2%", cursor: "pointer"}} onClick={handleClick}>
        <CardContent>
          <Grid container direction="column" >
            <Grid container item xs={6} direction="row" spacing={2} >
              <Grid item xs={3}>
                <Avatar sx={{ bgcolor: "#1976D2", width: "70px", height: "70px", marginTop: "5px", background: "#6160DC" }} src=""></Avatar>
              </Grid>
              <Grid container item xs={6} direction="column" sx={{ marginTop: "13px" }}>
                <Typography variant="h5">{data.name}</Typography>
                {data.location && <Typography variant="h7">{data.location.name}</Typography>}
              </Grid>
              <Grid item xs={3}><Icon color="primary" sx={{ margin: "0px 0px 0px 60px" }}>more_horiz</Icon></Grid>
            </Grid>

            <Grid container item xs={6} direction="row" style={{ marginTop: "8.5%" }}>

              <Grid container item xs={6}>
                <Grid item xs={3}><Icon sx={{ backgroundColor: "#6160DC", color: "white", borderRadius: "20px", height: "40px", width: "40px", padding: "7px 0px 0px 7px", marginTop: "4px" }}>directions_bike_circle</Icon></Grid>
                <Grid container direction="column" item xs={9}>
                  <Typography variant="h7">Hotline</Typography>
                  <Typography variant="h7">{data.phoneNumber}</Typography>
                </Grid>
              </Grid>

              <Grid container item xs={6}>
                <Grid item xs={3}><Icon sx={{ backgroundColor: "#6160DC", color: "white", borderRadius: "20px", height: "40px", width: "40px", padding: "7px 0px 0px 7px", marginTop: "4px" }}>directions_bike_circle</Icon></Grid>
                <Grid container direction="column" item xs={9}>
                  <Typography variant="h7">Staff</Typography>
                  {data.staff&&<Typography variant="h7">{data.staff.name}</Typography>}
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
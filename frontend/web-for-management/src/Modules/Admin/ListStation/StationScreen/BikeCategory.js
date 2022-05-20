import {
  Card,
  CardContent,
  Grid,
  CardMedia,
  Typography,
  Icon
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  root: {
    
    borderRadius:"8px",
    filter: "drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))",
  },
  list: {
    backgroundColor: '#E7EAED'
  }
})

export default function BikeCategory({data}) {
  const classes = useStyles()
  return (
    <Box className={classes.root} width="290px" height="380px">
      <Card >
        <CardContent sx={{height:"377px"}}>
          <Grid container direction="column">
            <Grid item xs={5}>
              <CardMedia
                component="img"
                height="247px"
                width="346px"
                sx={{maxWidth:"254px", maxHeight:"181px"}}
                src={data.imagePath}
                alt="green iguana"
              />
            </Grid>

            <Grid container item xs={7} direction="column">
              <Grid sx={{ height:"70px" }}>
                <Typography variant="body1" maxWidth="254px"
                  style = {{paddingTop:"10px"}}
                >{data.bikeName}</Typography>
              </Grid>
              <Grid container item xs={9} direction="column" >
                <Grid container item xs={6} direction="row" spacing={3} sx={{marginBottom:"5px"}}>
                  <Grid container item xs={6} direction="column">
                    <Typography variant="h7">Free</Typography>
                    <Grid container direction="row">
                    <Icon color="primary" fontSize="small" sx={{marginRight:"2px"}}>directions_bike</Icon>
                    <Typography variant="h7">{data.status.free} bikes</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={6} direction="column" alignItems="flex-start">
                    <Typography variant="h7" >Waiting</Typography>
                    <Grid container direction="row">
                    <Icon color="info" fontSize="small" sx={{marginRight:"2px"}}>directions_bike</Icon>
                    <Typography variant="h7">{data.status.waiting} bikes</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={6} direction="row" spacing={3}>
                  <Grid container item xs={6} direction="column">
                    <Typography variant="h7">Used</Typography>
                    <Grid container direction="row">
                    <Icon color="error" fontSize="small" sx={{marginRight:"2px"}}>directions_bike</Icon>
                    <Typography variant="h7">{data.status.hiring} bikes</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={6} direction="column" alignItems="flex-start">
                    <Typography variant="h7">Repair</Typography>
                    <Grid container direction="row">
                    <Icon color="secondary" fontSize="small" sx={{marginRight:"2px"}}>directions_bike</Icon>
                    <Typography variant="h7">{data.status.breakdown} bikes</Typography>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
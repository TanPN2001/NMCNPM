import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography, Icon } from '@mui/material';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#FFFFF'
    },
    details: {
        backgroundColor: '#F5F5F5',
        borderRadius: "20px",
    
    },
})
export default function Detail({details}) {
    const classes = useStyles();
    return (
        
        <Container sx={{ width: "900px", marginTop: "9px", marginLeft:"8px", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", }} >
            <Grid container direction="row" className={classes.details} style={{width:"910px"}} >
                <Grid container item xs={6}  sx={{paddingLeft:"4%", width:"450px"}} >

                    <Grid container item direction="row" alignItems="center" sx = {{height:"90px"}}>
                        <Typography variant="h4" align="center" sx ={{ }}>{details.stationName}</Typography>
                    </Grid>

                        <Typography variant="h6" component="div" style={{}} >This is address</Typography>

                        <Grid item container style={{marginTop:"4%", marginBottom:"4%"}}>
                        <Grid container item xs={6}>
                            <Grid item xs={3} ><Icon sx={{backgroundColor:"#6160DC", color:"white", borderRadius:"20px", height:"40px", width:"40px", padding:"7px 0px 0px 7px", marginTop:"4px"}}>directions_bike_circle</Icon> </Grid>
                            <Grid container direction="column" item xs={9}>
                                <Typography variant="h7">Num of type</Typography>
                               <Typography variant="h7">{details.listBikeCategory.length} types</Typography>
                            </Grid>
                        </Grid>

                        <Grid container item xs={6}>
                            <Grid item xs={3}><Icon sx={{backgroundColor:"#6160DC", color:"white", borderRadius:"20px", height:"40px", width:"40px", padding:"7px 0px 0px 7px", marginTop:"4px"}}>directions_bike_circle</Icon></Grid>
                            <Grid container direction="column" item xs={9}>
                                <Typography variant="h7">Bike amount</Typography>
                                <Typography variant="h7">{details.numOfBike} bikes</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item container xs={6} sx={{ borderLeft: "2px", borderStyle: "solid", paddingLeft:"2%", width:"450px"}}>

                    <Grid container item direction="row" alignItems="center" sx = {{height:"90px"}}>
                        <Typography variant="h4" >{details.staffName}</Typography>

                    </Grid>

                    <Typography variant="h6" component="div">Staff in Ecopark bike renting</Typography>

                    <Grid item container style={{marginTop:"4%", marginBottom:"4%"}} >
                        <Grid container item xs={6}>
                            <Grid item xs={3} ><Icon sx={{backgroundColor:"#6160DC", color:"white", borderRadius:"20px", height:"40px", width:"40px", padding:"8px 0px 0px 0px", marginTop:"4px"}} >check_circle</Icon> </Grid>
                            <Grid container direction="column" item xs={9}>
                                <Typography variant="h7">ID</Typography>
                                <Typography variant="h7">{details.staffID}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container item xs={6}>
                            <Grid item xs={3}><Icon sx={{backgroundColor:"#6160DC", color:"white", borderRadius:"20px", height:"40px", width:"40px", padding:"8px 0px 0px 0px", marginTop:"4px", marginLeft:"-25px"}}>mail_outline</Icon></Grid>
                            <Grid container direction="column" item xs={9} sx={{marginLeft:"-28px"}} >
                                <Typography variant="h7">Email</Typography>
                                <Typography variant="h7">{details.staffEmail}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
       
    )
}
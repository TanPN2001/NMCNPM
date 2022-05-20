import { Box, Button, Grid, Typography } from '@mui/material'

export default function CategoryDetails({data, needLoading, setNeedLoading}) {

    return (
        <Box>
            <Grid container sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "700px",
                width: "950px",
                border: "3px solid #6160DC",
                marginLeft: "5%",
                marginTop: "5%",
                borderRadius: "30px",
                marginLeft: "15px",
                
            }}>
                <Grid sx={{display: "flex",
                            alignSelf: "center",
                            position: "relative",
                            height: "40%",
                            }} item>
                    <img style={{ width: "auto", height: "100%",border: "3px solid #6160DC", borderRadius:"20px" }} src={data.data?.image} alt='Hello' />
                </Grid>
                <Grid container item direction="column">
                    <Grid container item direction="row">
                        <Grid item xs={6} >
                            <Typography variant="h5" sx={{marginLeft:"20%"}} id="textbikecategory" >Model:{data.data?.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" sx={{marginLeft:"30%"}} id="textbikecategory" >Số lượng:{data.length}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item direction="row" >
                        <Grid item xs={6} sx={{height:"40px", marginTop:"5px"}}>
                            <Typography variant="h5" sx={{marginLeft:"20%"}} id="textbikecategory" >Giá thuê: {data.data?.cost}d/giờ</Typography>
                        </Grid>
                    </Grid>
                    <div style={{paddingLeft:"290px"}}>----------------------------------------------------------</div>
                    <Grid item sx>
                        <Typography variant="subtitle1" sx={{marginLeft:"10%", marginRight:"8%", marginTop:"10px", marginBottom:"20px", height:"112px"}}>Mô tả: {data.data?.description} </Typography>
                    </Grid>
                </Grid>
                <Grid container item direction="row" sx={{marginBottom:"5px", marginTop:"10px"}}>
                </Grid>
            </Grid>
        </Box>
    )
}
import { Box, Button, Grid, Typography } from '@mui/material'
import { deleteCategory } from '../../Store/ListCategoryStore';

export default function CategoryDetails({data, needLoading, setNeedLoading, setEdit}) {
    const handleDelete=async ()=>{
        console.log(data.data?._id)
        const result = await deleteCategory(data.data?._id);
        console.log(result)
        if(result.status === "successs"){
            alert("Xoa thanh cong")
            setNeedLoading(needLoading+1)
        }else{
            alert(result)
        };
    }

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
                borderRadius: "30px"
            }}>
                <Grid sx={{display: "flex",
                            alignSelf: "center",
                            position: "relative",
                            height: "40%",
                            }} item>
                    <img style={{ width: "auto", height: "100%",border: "3px solid #6160DC", borderRadius:"20px" }} src={data.data.image} alt='Hello' />
                </Grid>
                <Grid container item direction="column">
                    <Grid container item direction="row">
                        <Grid item xs={6} >
                            <Typography variant="h5" sx={{marginLeft:"20%"}} id="textbikecategory" >Model: {data.data.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" sx={{marginLeft:"30%"}} id="textbikecategory" >Số lượng: {data.length}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item direction="row">
                        <Grid item xs={6}  sx={{height:"40px", marginTop:"5px"}}>
                            <Typography variant="h5" sx={{marginLeft:"20%"}} id="textbikecategory" >Giá thuê: {data.data.cost}</Typography>
                        </Grid>
                    </Grid>
                    <div style={{paddingLeft:"290px"}}>----------------------------------------------------------</div>
                    <Grid item sx>
                        <Typography variant="subtitle1" sx={{marginLeft:"10%", marginRight:"8%", marginTop:"10px", marginBottom:"20px", height:"112px"}} id = "description">Mô tả: {data.data.description} </Typography>
                    </Grid>
                </Grid>
                <Grid container item direction="row"sx={{marginBottom:"5px", marginTop:"10px"}}>
                    <Grid sx={{
                        marginTop: "-5%"
                    }}
                     item xs={6} align="center">
                        <Button variant="contained" id="Newmember" onClick={()=>setEdit(true)}>EDIT</Button>
                    </Grid>
                    <Grid sx={{
                        marginTop: "-5%"
                    }}
                         item xs={6} align="center">
                        <Button variant="contained" id="Newmember" onClick={handleDelete}>DELETE</Button>
                    </Grid>
                </Grid>
                <Grid container item direction="row" sx={{marginBottom:"5px"}}>
                </Grid>
            </Grid>
        </Box>
    )
}
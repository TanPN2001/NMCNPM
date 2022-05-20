import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCategoryByID } from "../../Store/ListCategoryStore";
import AddCategory from "../AddCategory/AddCategory";
import EditCategory from "../EditCategory/EditCategory";
import SearchBike from "../SearchBar/SearchBar";
import CategoryDetails from "./CategoryDetails";
import ListCategory from "./ListCategory";
import './BikeCategory.css'
import { PropagateLoader } from 'react-spinners';


export default function BikeCategories(){
    const [categories, setCategories] = useState([])
    const [chosenCategory, setChosenCategory]= useState(null);
    const [isAdding, setAdding] = useState(false)
    const [needLoading, setNeedLoading]= useState(1)
    const [edit, setEdit] = useState(false)
    const [url,setUrl]= useState('https://nmcnpm.herokuapp.com/api/v2/category')
    async function getCategory(){
        let token = localStorage.getItem("token");
        axios.get(url,{headers:{"Authorization":`Bearer ${token}`}})
        .then(doc=> { console.log(doc);
            setCategories(doc.data.data);
            getCategoryByID(doc.data.data[0]._id)
            .then((data)=>{
                setChosenCategory(data)
            })
        })
        
        
    }
    useEffect(() => {
        getCategory()

    },[needLoading,url])
    return(
    <Box sx={{
        // marginTop: "-58%",
        // marginLeft: "17%"
    }} >
    {
        (isAdding) &&
        <AddCategory setAdding={setAdding} setNeedLoading={setNeedLoading} needLoading={needLoading}></AddCategory>
        }
        {
        (edit) &&
        <EditCategory setEdit={setEdit} setNeedLoading={setNeedLoading} needLoading={needLoading} currentCategory={chosenCategory.data} ></EditCategory>
        }

        <Grid container direction="column">
            <Grid sx={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Grid container item>
                    <SearchBike/>
                </Grid>
                <Button id="Dung_Newmember" onClick={()=>setAdding(true)} variant="contained" sx={{
                    position:"absolute",
                    margin:"20px 0px 0px 1000px",

                }}>New category</Button>
            </Grid>
            <Grid sx={{
                backgroundColor: "white",
                height: "910px",
                width: "1510px",
                marginLeft: "25px",
                marginTop: "137px",
                position: "absolute",
                borderRadius: "40px",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.7))",

            }}>
                <Grid container item direction="row" sx={{marginTop:"1%"}}>
                    <Grid item xs={6}>
                    <h1 id ="title" style={{ padding: "0px", marginLeft: "30px", marginTop:"35px", marginBottom:"-20px" }}>Category</h1>
                    </Grid>
                    <Grid sx={{
                        width: "15%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }} item xs={6}>

                        <div className="dropdown" style={{ marginRight: "80px", marginTop: "50px" }}>
                                <div className="dropdown-select" href="#">
                                    <span>Sắp xếp theo</span>
                                </div>
                                <div className="dropdown-list">
                                    <div className="dropdown-list-item" onClick={(e)=>setUrl('https://nmcnpm.herokuapp.com/api/v2/category?sortBy=priceLowToHigh')}>Giá thấp - cao</div>
                                    <div className="dropdown-list-item" onClick={(e)=>setUrl('https://nmcnpm.herokuapp.com/api/v2/category?sortBy=priceHighToLow')}>Giá cao - thấp</div>
                                </div>
                            </div>
                        
                    </Grid>
                </Grid>
                <Grid container item direction="row">
                    <Grid container item xs={4} sx={{
                        marginTop: "1%",
                        marginLeft: "20px",
                    }}>
                        {categories?(<ListCategory  categories={categories} setChosenData={setChosenCategory}/>):(<p></p>)}
                    </Grid>
                    <Grid container item xs sx={{
                            marginLeft: "-45px"
                        }}>
                    {chosenCategory?(<CategoryDetails data={chosenCategory} setNeedLoading={setNeedLoading} needLoading={needLoading} setEdit={setEdit}/>  ):(<div style={{ paddingLeft: 100 }}><PropagateLoader color="#6160DC" /></div>)}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
    )
}
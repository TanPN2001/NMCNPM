import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { deleteCategory, getCategoryByID } from "../Store/ListCategoryStore";
import SearchBike from "../SearchBar/SearchBar";
import CategoryDetails from "./CategoryDetails";
import ListCategory from "./ListCategory";
import './BikeCategory.css'



export default function BikeCategoriesOfStaff(){
    const [categories, setCategories] = useState([])
    const [chosenCategory, setChosenCategory]= useState(null);
    const [isAdding, setAdding] = useState(false)
    const [needLoading, setNeedLoading]= useState(1)
    const [edit, setEdit] = useState(false)
    const [url, setUrl] = useState('https://nmcnpm.herokuapp.com/api/v2/staff/manage/category')
    async function getCategory(){
        let token = localStorage.getItem("token");
        axios.get(url,{headers:{"Authorization":`Bearer ${token}`}})
        .then(doc=> {
            console.log(doc.data.data)
            setCategories(doc.data.data);
        //     if(doc.data.data>0){
        //     getCategoryByID(doc.data.data[0]?._id)
        //     .then((data)=>{
        //         setChosenCategory(data)
        //     })
        // }
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
        marginTop: "-50%",
        marginLeft: "17%",
    }} >
  

        <Grid container direction="column">
            <Grid sx={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Grid container item>
                    <SearchBike/>
                </Grid>
            </Grid>
            <Grid sx={{
                backgroundColor:"white",
                height: "850px",
                width: "1510px",
                marginLeft: "50px",
                marginTop: "10px",
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
                                    <div className="dropdown-list-item" onClick={(e)=>setUrl('https://nmcnpm.herokuapp.com/api/v2/staff/manage/category?sortBy=priceHighToLow')}>Giá cao - thấp</div>
                                    <div className="dropdown-list-item" onClick={(e)=>setUrl('https://nmcnpm.herokuapp.com/api/v2/staff/manage/category?sortBy=priceLowToHigh')}>Giá thấp - cao</div>
                                </div>
                            </div>  
                        

                    </Grid>
                </Grid>
                <Grid container item direction="row">
                    <Grid container item xs={4} sx={{
                        marginTop: "3%",
                        
                    }}>
                        {categories.length>0?(<ListCategory  categories={categories} setChosenData={setChosenCategory}/>):(<h2>No data found</h2>)}
                    </Grid>
                    <Grid container item xs={8}>
                    {chosenCategory?(<CategoryDetails data={chosenCategory} setNeedLoading={setNeedLoading} needLoading={needLoading}/> ):(<p></p>)}
                    </Grid>
                </Grid>
            
            </Grid>
        </Grid>
    </Box>
    )
}
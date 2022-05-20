import {   Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import BikeCategory from "./BikeCategory";
import ListData from "./ListData";
const url = 'https://jsonplaceholder.typicode.com/posts';
const useStyles=makeStyles({
    root:{
        backgroundColor:"#fffff"
    },
    list:{
        backgroundColor:'#fffff',
    }
}) 


export default function ListBikeCategory({bikeCategories}){
    const classes= useStyles()
    console.log(bikeCategories )

    return(
        <Box className={classes.list} sx={{width:"100%", height:"100%", marginLeft:"-10px"}}>
             {bikeCategories ? (
                <>
                    <ListData
                        data={bikeCategories}
                        RenderComponent={BikeCategory}
                        title="BikeCategory"
                        pageLimit={5}
                        dataLimit={3}
                        direction="row"
                        style={{margin:"0 0 4% 3%"}}
                        paginationStyle={{paddingLeft:"38%"}}
                    />
                </>
            ) : (
                <h1>No nothing  to display</h1>
            )}
    </Box>
    )
}
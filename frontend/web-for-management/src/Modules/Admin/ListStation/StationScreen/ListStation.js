import { useEffect, useState } from "react";
import {  Container, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ListData from "./ListData";
import Station from "./Station";

const useStyles=makeStyles({
    root:{
        backgroundColor:"#fffff"
    },
    list:{
        width:"100%",
        height:"100vh"
    }
}) 


export default function ListStation({stations, setChosenData}){
    const classes= useStyles()

    return(
        <Container className={classes.list}>
            <h1 id="title" style={{padding: '0px'}}>List station</h1>
             {stations ? (
                <>
                    <ListData
                        style = {{
                            paddingTop:"20px"
                        }}
                        data={stations}
                        RenderComponent={Station}
                        title="Posts"
                        pageLimit={5}
                        dataLimit={3}
                        direction="column"
                        paginationStyle={{marginLeft:"130px", marginTop:"20px"}}
                        setChosenData={setChosenData}
                        changeChosenData={true}
                    />
                </>
            ) : (
                <h1>Loading data ....</h1>
            )}
    </Container>
    )
}
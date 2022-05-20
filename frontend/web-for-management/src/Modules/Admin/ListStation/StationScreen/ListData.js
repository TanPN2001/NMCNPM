import { Pagination, Grid, Container , Box} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getByID } from '../../Store/ListStationStore';
export default function ListData({ data, RenderComponent, dataLimit, direction, style, paginationStyle, setChosenData, changeChosenData }) {
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = async (event, value)=> {
        setCurrentPage(value);
        console.log(value)
        if(changeChosenData&&data[(value-1)*dataLimit]!==undefined){
            const chosenData= await getByID(data[(value-1)*dataLimit]._id)
        setChosenData(chosenData)
        }
    }
    let page = parseInt(data.length/dataLimit)+1;
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, [currentPage]);

    return (
        <Box sx={{width:"100%", height:"100%"}}>
            <Grid container direction={direction} spacing={2} style={style} >
                {getPaginatedData().map((d, idx) => (
                    <Grid item  key={idx} sx={4}>
                        <RenderComponent data={d} setChosenData={setChosenData}/>
                    </Grid>
                ))}
            </Grid>
            <Grid item container sx={paginationStyle} >
            <Pagination count={page} onChange={changePage} color='standard'/>
            </Grid>
        </Box>
    );
}
import { FreeBreakfast } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import { Container, Box, Grid, Button, Typography, TextField, Select, MenuItem } from '@mui/material';
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
    Cell
} from "recharts";
import { getNumberBike , getByID, getListStation} from "./Services";

const useStyles = makeStyles({
  container: {
    width: "79%",
    marginLeft: "2%",
    marginTop: "320px",
    borderRadius: "40px",
    backgroundColor: 'white',
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    filter: "drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))",
  },
  header: {
    height: "6%",
    marginTop: "4%",
    marginLeft: "0%",
  },
  content: {
    width: "100%",
    height: "70%",
    justifyItems: "center",
  },
  bottom: {
    height: "10%",
    marginTop: "5%",
    marginBottom: "3%"
  }
})
const COLORS = ['#00BB00', '#DD0000', '#FFFF00', '##000011'];
export default function RenderBarChart() {
  const classes = useStyles()
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [listStation, setListStation] = useState([])
  const d1 = []
  const d2 = []

  useEffect(() => {
    const showStation = async () => {
        const result = await getListStation();
        if(result==="Failed to fetch"){
            setListStation([]);
            console.log("Loi roi Loi Roi")
        }else{
        setListStation(result);
        getNumberCategory(result[0].id);
        getNumberStatus(result[0].id);
        }
    }
    showStation();
  },[])

    const getNumberCategory = async (id) => {
        const result = await getNumberBike(id);
        if(result==="Failed to fetch"){
          setData1(null)
            console.log("Loi me r con dau")
        }else{
          setData1(result); 
          console.log(result);
        }
      }
      const getNumberStatus = async (id) => {
        const result = await getByID(id);
        if(result==="Failed to fetch"){
          setData1(null)
          console.log("Loi me r con dau")
        }else{
          setData2(result);
          console.log(result);
        }
      }  

  const handleChange = (event) => {
    const index = event.target.value - 1;
    console.log(listStation[index])
    getNumberCategory(listStation[index].id);
    getNumberStatus(listStation[index].id);
  }

  d2.push(
    {name: 'Free', number: data2.free},
    {name: 'Hiring', number: data2.hiring},
    {name: 'Waiting', number: data2.waiting},
    {name: 'Repair', number: data2.repair},
  )
  data1.forEach(element => d1.push(
    {name: element.bikeName, number: element.bikeNumber},
  ))
  
    return (
      <Box container className={classes.container}>
        <Grid container className={classes.header} direction="row" justifyContent="space-around" alignItems="center">
            <Typography variant="h4" sx ={{position:"absolute"}}>Thống kê số lượng xe</Typography>
        </Grid>
        <Grid container className={classes.content} direction="row" justifyItems="center" alignItems="center">
          <Grid container item xs ={6} direction='column'>
            <Grid container sx = {{width: '100%', justifyContent: "center", paddingTop:"70px"}}>
              <PieChart width={400} height={400}>
                  <Pie
                    dataKey="number"
                    isAnimationActive={true}
                    data={d2}
                    cx={200}
                    cy={200}
                    outerRadius={160}
                    fill="#8884d8"
                    label
                  >{
                d1.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
                </Pie>
                <Tooltip />
              </PieChart>
            </Grid>
            <Grid container sx = {{justifyContent:"center"}}>
              <Typography variant="h5" align ='center' sx ={{position:"absolute"}}>Theo trạng thái</Typography>
            </Grid>
          </Grid>
          <Grid container item xs ={6} direction='column' sx = {{paddingTop:"70px"}}>
            <Grid container sx = {{justifyContent:"center"}}>
              <BarChart
                width={620}
                height={400}
                data={d1}
                margin={{
                  top: 5,
                  right: 80,
                  left: 0,
                  bottom: 5,
                }}
                barSize={40}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 30, right: 30 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="number" fill="#8884d8" background={{ fill: "#eee" }} />
              </BarChart>
            </Grid>
            <Grid container sx={{justifyContent:"center"}}>
              <Typography variant="h5" align ='center' sx ={{position:"absolute"}}>Theo loại xe</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.bottom} justifyContent="center" alignItems="center">
          <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                defaultValue={1}
                sx={{ width: "20%" }}
                onChange={handleChange}
                >
                {
                    (listStation !== []) ? (listStation?.map((station, index) => <MenuItem value={index + 1}><em>{station.name}</em></MenuItem>)) : <></>
                }
              </Select>
        </Grid>
      </Box>
    );
  };





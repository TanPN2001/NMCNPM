import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getCategoryByID } from '../Store/ListCategoryStore';

export default function CategoryItem({ data, setChosenData }) {
  const handleClick = async () => {
    console.log(data._id)
    const result = await getCategoryByID(data._id);
    setChosenData(result)
    console.log(data)
  }
  return (
    <Box>
      <Card id="DungNA_listdata" onClick={handleClick} >
        <Box sx ={{ boder:"solid 3px #6160DC", alignSelf:"center", marginLeft:"20px" }}>
          <CardMedia
            component="img"
            sx={{ width: "71px" , border: "1px solid #6160DC", borderRadius: "6px" }}
            image={data.image}
            alt="Bike category"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf:"center"  }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5" id="textbikecategory">
              {data.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" component="div">
              {data.cost}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

          </Box>
        </Box>
      </Card>
    </Box>
  );
}
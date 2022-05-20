import Logo from '../../images/eco1.png'
import { useNavigate } from 'react-router'
import { Box, Button, Grid } from '@mui/material'
import './SideBar.css'
export default function Sidebar({ items }) {
    let navigate = useNavigate();
    const handleClick = (href) => {
        navigate(href)
    }
    return (
        <Box sx={{ height: "1080px", width: "100%", backgroundColor:"#FFFFFF", filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))", }} >
            <Grid container direction="column" spacing={2}>
                <Grid item  alignItems="center">
                    <img src={Logo} alt="logo" style={{marginLeft:"28%", marginTop:"15%", marginBottom:"20%"}}/>
                </Grid>
                <Grid item container direction="column" spacing={2} >
                    {items.map((item, index) => (
                        <Grid key={index} item width="100%" alignItems="center">
                        <Button
                            variant='contained'
                            onClick={() => handleClick(item.href)}
                            id="NewmemberSideBar"
                            style={{filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",}}
                            
                        >
                            {item.title}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>

    )
}

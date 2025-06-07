import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default function Edit() {
  const passport=sessionStorage.getItem("passport")
  const [home,setHome]=useState('')
  const [aadhaar,setAadhaar]=useState('')
  const [pan,setPan]=useState('')
  const [profession,setProfession]=useState('')
  const [office,setOffice]=useState('')
  const [digilocker,setDigilocker]=useState('')
  const [surgery,setSurgery]=useState('')
  const [marital,setMarital]=useState('')
  const [verified,setVerified]=useState('')
  const info={
    passport:passport,
    home:home,
    aadhaar:aadhaar,
    pan:pan,
    profession:profession,
    office:office,
    digilocker:digilocker,
    surgery:surgery,
    marital:marital,
    verified:verified

  }
  const navigate=useNavigate()
  const handleclick=async ()=>{
    const res=await axios.post("http://localhost:8000/security/Users/Edit/",info)
    if(res.status===200){
      navigate('/Profile')
    }else{
        alert("error in editing")
    }
  }
  return (
    <ThemeProvider theme={theme}>
      
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:10
  }}
>
<Card sx={{ maxWidth: 700 }}>
     
      <CardContent>
        
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
<Typography variant="h3">Edit your details here</Typography>
<Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="Home Address" id="fullWidth" onChange={(e)=>{setHome(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="Aadhaar Number" id="fullWidth" onChange={(e)=>{setAadhaar(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="PAN Number" id="fullWidth" onChange={(e)=>{setPan(e.target.value)}} />
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="Profession" id="fullWidth" onChange={(e)=>{setProfession(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="Office Address" id="fullWidth" onChange={(e)=>{setOffice(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="Digilocker Number" id="fullWidth" onChange={(e)=>{setDigilocker(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="Surgery History" id="fullWidth" onChange={(e)=>{setSurgery(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="Marital Status" id="fullWidth" onChange={(e)=>{setMarital(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField fullWidth label="Verified" id="fullWidth" onChange={(e)=>{setVerified(e.target.value)}}/>
    </Box>
    <Button variant="contained" fullWidth onClick={handleclick}>Submit</Button>
</Stack>
      </CardContent>
      
    </Card>
</Stack> {/* uses flexbox gap by default */}
    </ThemeProvider>
  );
}

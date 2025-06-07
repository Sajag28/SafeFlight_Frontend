import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Fly from '../assets/Flysafe.png'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Air from '../assets/transport.png'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});
export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [check,setCheck]=useState(true)
  const [sentOtp,setSent]=useState('')
  const [enteredOtp,setEntered]=useState('')
  const navigate=useNavigate()
  const handleClick1=async ()=>{
    const res=await axios.get("http://localhost:8000/security/otp/send")
    if(res.status===200){
    const data=res.data
    const getOtp=data.otp
    setSent(getOtp)
    alert("OTP sent to your email")
    }
  else{
    alert("Invalid Email")
  }
}
const handleClick2=()=>{
    if(enteredOtp===sentOtp){
       setCheck(false)
    }
    else{
        alert("Invalid OTP")
    } 
}
 const info={
    email:email,
    password:password
 }
  const handleClick3=async ()=>{
    const res=await axios.post("http://localhost:8000/security/Users/Login/",info)
    if(res.status===200){
      const data=res.data
      sessionStorage.setItem('name',data.name)
      sessionStorage.setItem('age',data.age)
      sessionStorage.setItem('gender',data.gender)
      sessionStorage.setItem('passport',data.passport)
      sessionStorage.setItem('email',email)
      navigate('/Dashboard')
    }
    else{
        alert("Invalid Email or Password")
    }
  }
  return (
    <ThemeProvider theme={theme}>

<Stack
  direction={{sm:"column",xs:"column",md:"row"}}
  spacing={0}
  sx={{
    justifyContent: "space-around",
    alignItems: "center",
    mt:20
  }}
>
<img src={Fly} height="500px" width="460px"/>
    <Card sx={{ maxWidth: 1000 }}>
      
      <CardContent>
        
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Typography variant="h3">Login to Our Portal</Typography>
    <img src={Air} height="120px" width="120px"/>
    
    <TextField
          required
          id="outlined-required"
          label="Email Id"
          fullWidth
          defaultValue=""
          onChange={(e)=>{setEmail(e.target.value)}}
        />

<TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          required
          fullWidth
          autoComplete="current-password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
         <Button variant="outlined" onClick={handleClick1}>Send OTP</Button>
<Typography><a href="/">Don't have account to our portal? Get Start here</a></Typography>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
<TextField
          required
          id="outlined-required"
          label="Enter OTP"
          defaultValue=""
          onChange={(e)=>{setEntered(e.target.value)}}
        />
        <Button variant="contained" sx={{backgroundColor:'#43a047'}} onClick={handleClick2}>Verify OTP</Button>
</Stack>
<Button variant="contained" disabled={check} sx={{fontSize:18}}fullWidth onClick={handleClick3}>Login Here</Button>
</Stack>
      </CardContent>
     
    </Card>
    </Stack>
    </ThemeProvider>
  );
}

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fly from '../assets/Flysafe.png'
import Plane from '../assets/Plane5.jpg'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import CardActionArea from '@mui/material/CardActionArea';
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default function UserSignup() {
  const [name,setName]=useState('')
  const [age,setAge]=useState('')
  const [gender,setGender]=useState('')
  const [email,setEmail]=useState('')
  const [passport,setPassport]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [showPassword, setShowPassword] = useState(false);
  const info={
    name:name,
    age:age,
    gender:gender,
    email:email,
    passport:passport,
    password:password,
  }
  const navigate=useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleClick= async ()=>{
    if(password!==confirmPassword){
      alert("Entered password and confirm password are not same")
    }
    else{
      const response=await axios.post("http://localhost:8000/security/Users/Signup/",info)
      if(response.status==201){
        sessionStorage.setItem('name',name)
        sessionStorage.setItem('email',email)
        sessionStorage.setItem('age',age)
        sessionStorage.setItem('passport',passport)
        sessionStorage.setItem('gender',gender)
        navigate('/Dashboard')
      }
      else{
        alert("Failed to signup")
      }
    }
  }
  return (
    <ThemeProvider theme={theme} sx={{scrollX:'hidden'}}>

<Stack
  direction={{xs:"column",sm:"column",md:"row"}}
  spacing={0}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

<div style={{ backgroundImage: `url(${Plane})`,
          backgroundSize: "cover",  // Ensures full coverage
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "99vh",  // Covers 80% of the viewport height
          width: "72%",
          display: "flex",
          alignItems: "center",
        //   marginTop:"2%",
          justifyContent: "center",}}>

</div>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:0,
   
  }}
>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
<Card sx={{ maxWidth: 900 }}>
      
      <CardContent>
     
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
   
{/* <Stack
  direction="row"
  spacing={0}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
> */}

    <Typography variant="h5" sx={{textAlign:'center',mb:2}}>Get Started with our Safe Flight Platform</Typography>
    <img src={Fly} height="110px" width="110px"/>
    </Stack>
    <Box sx={{ width: 500, maxWidth: '100%',mt:5 }}>
      <TextField fullWidth label="Name" id="fullWidth" onChange={(e)=>{setName(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%',mt:2 }}>
      <TextField fullWidth label="Age" id="fullWidth" onChange={(e)=>{setAge(e.target.value)}} />
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%',mt:2 }}>
      <TextField fullWidth label="Gender" id="fullWidth" onChange={(e)=>{setGender(e.target.value)}} />
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%',mt:2 }}>
      <TextField fullWidth label="Passport Number" id="fullWidth" onChange={(e)=>{setPassport(e.target.value)}}/>
    </Box>
    <Box sx={{ width: 500, maxWidth: '100%',mt:2 }}>
      <TextField fullWidth label="Email ID" id="fullWidth" onChange={(e)=>{setEmail(e.target.value)}}/>
    </Box>
    {/* <Box sx={{ width: 500, maxWidth: '100%',mt:2 }}>
      <TextField fullWidth label="Password" id="fullWidth" onChange={(e)=>{setPassword(e.target.value)}}/>
    </Box> */}
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            fullWidth
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </FormControl>
    {/* <Box sx={{ width: 500, maxWidth: '100%',mt:2 }}>
      <TextField fullWidth label="Confirm Password" id="fullWidth" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
    </Box> */}
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            fullWidth
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
          />
        </FormControl>
<Typography><a href="/Login">Already Have an account? Login Here</a></Typography>
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:4
  }}
>

    <Button variant="contained"  sx={{fontSize:18}} endIcon={<AirplaneTicketIcon/>} fullWidth onClick={handleClick}>Get Started</Button>
    </Stack>
{/* </Stack> */}
      </CardContent>
      
    </Card>
    
</Stack>
</Stack>
</Stack>
    </ThemeProvider>
  );
}

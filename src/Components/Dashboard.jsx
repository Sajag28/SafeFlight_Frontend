import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';;
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Booking2 from '../assets/Plane3.jpg'
import Fly from '../assets/Flysafe.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import text from '../assets/text.png'
import React, { useState,useEffect } from "react";
import dayjs from "dayjs";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Airplane from '../assets/Airplane1.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Profile from '../assets/profile.png'
import Woman from '../assets/woman.png'
import right from '../assets/right.png'
import ticket from '../assets/Ticket1.png'
import flight from '../assets/flight.png'
import cancel from '../assets/cancelled.png'
import flight2 from '../assets/flight5.png'
import flight3 from '../assets/Plane2.jpg'
import down from '../assets/arrow3.png'
import ticket2 from '../assets/travel1.png'
import payment from '../assets/payment2.png'
import calendar from '../assets/calendar.png'
export default function Dashboard(){
  const [name,setName]=useState('')
  const [age,setAge]=useState('')
  const [email,setEmail]=useState('')
  const [passport,setPassport]=useState('')
  const [gender,setGender]=useState('Male')
  useEffect(()=>{
    const name1=sessionStorage.getItem('name')
    const age1=sessionStorage.getItem('age')
    const email1=sessionStorage.getItem('email')
    const passport1=sessionStorage.getItem('passport')
    const gender=sessionStorage.getItem('gender')
    console.log(gender)
    console.log(name1)
    console.log(email1)
    console.log(age1)
    setName(name1)
    setAge(age1)
    setEmail(email1)
    setPassport(passport1)
    setGender(gender)
  },[])
  const navigate=useNavigate()
  const [open1, setOpen1] = useState(false);
  const toggleDrawer = (newOpen) => () => {
          setOpen1(newOpen);
        };
         
   const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
  return(
    <>
    <Card sx={{ maxWidth: 1500,heigth:"60px"}}>
<CardContent>

<Stack
  direction={{ xs: 'column', sm: 'column',md:'row' }}
  spacing={2}
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
    mx:"auto"

  }}
>

  <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "flex-start",
    alignItems: "center",
  }}
>
<img src={Fly} height="70px" width="70px"/>
<Typography sx={{ml:10}} variant="h5">FLY SAFE WITH US</Typography>
</Stack>


<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-around",
    alignItems: "center",
  }}
>
<div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<AccountBoxIcon />}
        sx={{backgroundColor:'#121212',color:'white'}}
      >
        Options For Ticket
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >
        <MenuItem onClick={handleClose}>Cancel Ticket</MenuItem>
        <MenuItem onClick={handleClose}>Travel History</MenuItem>
        <MenuItem onClick={handleClose}>Reschedule Booking</MenuItem>
        <MenuItem onClick={handleClose}>Last Transaction</MenuItem>
        <MenuItem onClick={handleClose}>Active Booking</MenuItem>
        <MenuItem onClick={handleClose}>Previous Cancelled Booking</MenuItem>
      </Menu>
    </div>
<Button sx={{mr:20,backgroundColor:'#121212'}} variant="contained">Logout</Button>
<Button onClick={toggleDrawer(true)} sx={{backgroundColor:'#121212',color:'#fafafa'}}>Open drawer</Button>
      <Drawer open={open1} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>


      </Drawer>
</Stack>
</Stack>
</CardContent>
</Card>
   
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "flex-start",
    alignItems: "flex-start",
    mt:5,
    ml:10,
    mr:2
  }}
>

  
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }}
>

  <Typography variant="h2">Welcome, </Typography>
  <Typography variant="h2" sx={{color:'#03a9f4'}}>{name} </Typography>
</Stack>
<Typography variant="h3">To Your destination to safe access of the flight details and booking information</Typography>
</Stack>
<Stack
  direction={{sm:"column",xs:"column",md:"row"}}
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:4
  }}
>

<Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={(gender=="Male") ? Profile : Woman}
          alt="green iguana"
        />
        <CardContent>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

          <Typography gutterBottom variant="h5" component="div">
            View your Profile Details
          </Typography>
          <Button variant="contained" onClick={()=>{navigate('/Profile')}}>View my Profile</Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
    

    </Stack>

  
<Card sx={{ maxWidth: 1400 ,mt:5}}>
     
      <CardContent>
      <Stack
  direction={{xs:"column",sm:"column",md:"row"}}
  spacing={2}
  sx={{
    justifyContent: "space-evenly",
    alignItems: "center",
  }}
>
  <img src={flight2} height="400px" width="550px"/>
   
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Typography variant="h3" >Need a flight for your place? </Typography>
  <Typography variant="h4">Check out our flight options</Typography>
  <Typography variant="h4" >at price suitable to your pocket</Typography>
  <img src={down} height="200px" width="200px"/>
</Stack>

  </Stack>
      </CardContent>
      
    </Card>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:5
  }}
>

    <Card sx={{ maxWidth: 1000 }}>
      <CardMedia
        sx={{ height: 400 }}
        image={flight3}
        title="green iguana"
      />
      <CardContent>
       
<Stack
  direction={{xs:"column",sm:"column",md:"row"}}
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Typography variant="h4">Check out Flights Here</Typography>
  <Button variant="contained" sx={{fontSize:20}} onClick={()=>{navigate("/Flights")}}>See Flights</Button>
</Stack>
      </CardContent>
      
    </Card>
    </Stack>
    <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "flex-start",
    
    mt:6
  }}
>
<Card sx={{ maxWidth: 700,color:'#fafafa',backgroundColor:'#0277bd' }}>
      <CardContent>
        <Typography variant="h3">Options you can access here</Typography>
      </CardContent>
    </Card>
  <img src={right} height="80px" width="80px" />
  <Card sx={{ maxWidth: 700,color:'#121212',backgroundColor:'#43a047' }}>
      <CardContent>
        <Typography variant="h3">That too very Safely</Typography>
      </CardContent>
    </Card>
</Stack>
<Stack
  direction={{xs:"column",sm:"column",md:"row"}}
  spacing={4}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:5
  }}
>
<Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={ticket}
          alt="green iguana"
        />
        <CardContent>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

          <Typography gutterBottom variant="h5" component="div">
            View your Journey Details
          </Typography>
          <Button variant="contained" onClick={()=>{navigate('/Details')}}>View my Journey Details</Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={flight}
          alt="green iguana"
        />
        <CardContent>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

          <Typography gutterBottom variant="h5" component="div">
            Reschedule your Booking
          </Typography>
          <Button variant="contained" onClick={()=>{navigate('/Reschedule')}}>Want to Reschedule my Booking</Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={cancel}
          alt="green iguana"
        />
        <CardContent>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

          <Typography gutterBottom variant="h5" component="div">
            Cancellation of Your Flights
          </Typography>
          <Button variant="contained" onClick={()=>{navigate('/Cancel')}}>Cancel My Booking</Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
</Stack>
<Stack
  direction={{xs:"column",sm:"column",md:"row"}}
  spacing={4}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:5
  }}
>
<Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={ticket2}
          alt="green iguana"
        />
        <CardContent>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

          <Typography gutterBottom variant="h5" component="div">
            All Your Active Bookings
          </Typography>
          <Button variant="contained" onClick={()=>{navigate('/Active')}}>Show me upcoming flights</Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={payment}
          alt="green iguana"
        />
        <CardContent>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

          <Typography gutterBottom variant="h5" component="div">
            Last Transaction
          </Typography>
          <Button variant="contained" onClick={()=>{navigate('/Reschedule')}}>last transaction</Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={calendar}
          alt="green iguana"
        />
        <CardContent>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

          <Typography gutterBottom variant="h5" component="div">
            Cancelled Bookings
          </Typography>
          <Button variant="contained" onClick={()=>{navigate('/Cancelled')}}>Cancelled Bookings</Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
</Stack>


    </>
  )
}
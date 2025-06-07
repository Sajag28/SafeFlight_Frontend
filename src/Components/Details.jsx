import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import tick from '../assets/Tick.png';
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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fly from '../assets/Flysafe.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import React, { useState } from "react";
import Ticket from '../assets/Ticket4.png'
import axios from "axios";
import TextField from '@mui/material/TextField';
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default function Details() {
     const [booking_id, setBookingID] = useState("");
    
     const [open1, setOpen1] = useState(false);
     const navigate = useNavigate();
    
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
        const handleChange=(event)=>{
            setBookingID(event.target.value);
            console.log(booking_id);
        }
       
        const name1=sessionStorage.getItem('name')
        const email1=sessionStorage.getItem('email')
        const info={
            name:name1,
            email:email1
        }
    //     const handleClick1= async ()=>{
    //       try{
    //         const response=await axios.post("https://d581-136-233-9-104.ngrok-free.app/security/validate/",info)
    //         if(response.status===200){
        
    //             console.log("Validated successfully")
    //           }
    //     }
    //     catch (err) {
    //         console.error("Validation failed:", err);
    //         alert("Name and Email are bot, Trying for hack.");
    //     }

    //     try{
    //         const data=await axios.get(`https://d581-136-233-9-104.ngrok-free.app/security/ip/${booking_id}/`)
    //         console.log(data)
    //         console.log(data.status)
    //         if(data.status===200){
    //             // window.location.href=`https://d581-136-233-9-104.ngrok-free.app/security/qr/${booking_id}/`
    //             console.log(data.status)
                
    //         }
    //         else{
    //             alert("VPN Detected")
    //         }
    //     }
    //     catch(err){
    //         console.error("Error fetching data:", err);
    //     }
    // }
    const book={
        booking_id:booking_id,
    }
    const handleClick1 = async () => {
        try {
          // Step 1: Validate name/email
          console.log(typeof booking_id)
          const response = await axios.post("https://71aa-2409-40f4-ae-fbc4-306c-420c-ea23-ac76.ngrok-free.app/security/validate/", info);
          if (response.status === 200) {
            console.log(response)
            console.log("Validated successfully");
      
            // Step 2: Check IP validation only after successful validation
            try {
              const data = await axios.post("https://71aa-2409-40f4-ae-fbc4-306c-420c-ea23-ac76.ngrok-free.app/security/internet/",book);
              console.log("IP Check Response:", data);
              console.log("Status:", data.status);
      
              if (data.status === 200) {
                //Success: Redirect to QR page
                window.location.href = `https://71aa-2409-40f4-ae-fbc4-306c-420c-ea23-ac76.ngrok-free.app/security/qr/${booking_id}/`;
                console.log("Redirecting to QR page...");
              } else {
                alert("VPN Detected");
              }
            } catch (err) {
              console.error("Error fetching IP validation:", err);
              alert("Something went wrong while checking location/IP.");
            }
      
          } else {
            alert("Validation failed.");
          }
        } catch (err) {
          console.error("Validation failed:", err);
          alert("Name and Email are bot, Trying for hack.");
        }
      };
      
  return (
    <ThemeProvider theme={theme}>
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
<Typography sx={{ml:2}} variant="h5">FLY SAFE WITH US</Typography>
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
<Button sx={{backgroundColor:'#121212'}} variant="contained">Logout</Button>
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
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:1
  }}
>


<Card sx={{ maxWidth: 800 }}>
      
      <CardContent>
        
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
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

<Typography variant="h3">Get your journey details</Typography>
<img src={tick} height="100px" width="100px"/>
</Stack>
<img src={Ticket} height="380px" width="400px"/>
<Typography variant="h5" sx={{textAlign:'textAlign'}}>Enter the Booking ID to get your journey details</Typography>
<Box sx={{ width: 600, maxWidth: '100%' }}>
      <TextField fullWidth label="Enter the Booking ID" id="fullWidth" onChange={handleChange}/>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Button variant="contained" sx={{backgroundColor:'#4caf50',mt:2,fontSize:16}} onClick={handleClick1}>Fetch my Details</Button>
</Stack>
    </Box>
</Stack>
      </CardContent>
     
    </Card>
    </Stack>
         {/* uses flexbox gap by default */}
    </ThemeProvider>
  );
}

import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Plane from '../assets/Booking.jpg'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Cancelicon from '../assets/Cancelicon.png'
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});
theme.typography.h2 = {
    fontSize: '1.0rem',
    '@media (min-width:600px)': {
      fontSize: '2.0rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.0rem',
    },
  };
export default function Cancel() {
    const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
    const handleClose = () => {
        setAnchorEl(null);
      };
      const [open1, setOpen1] = useState(false);
    
      const toggleDrawer = (newOpen) => () => {
        setOpen1(newOpen);
      };
      const [bookingNumber, setBookingNumber] = useState("");
      const [enteredOtp, setEnteredOtp] = useState('');
      const [isVerified, setIsVerified] = useState(false);
      const [cancelButtonDisabled, setCancelButtonDisabled] = useState(true);
      const handleOtp = async () => {
        if (!bookingNumber) {
          alert("Please enter booking number first");
          return;
        }
      
        try {
          const response = await axios.get(`http://localhost:8000/security/otp/send/`);
          const otp = response.data.otp;
      
          sessionStorage.setItem("otp", otp);
          alert("OTP has been sent to your registered email.");
        } catch (error) {
          console.error("Error fetching OTP:", error);
          alert("Failed to send OTP. Try again.");
        }
      };
      const handleVerify = () => {
        const storedOtp = sessionStorage.getItem("otp");
      
        if (storedOtp && storedOtp === enteredOtp) {
          alert("OTP Verified!");
          setIsVerified(true);
          setCancelButtonDisabled(false);
        } else {
          alert("Invalid OTP.");
          setIsVerified(false);
          setCancelButtonDisabled(true);
        }
      };
      const handleCancelBooking = async () => {
        try {
          console.log("Booking Number:", bookingNumber);
          console.log("Booking no type: ",typeof bookingNumber);
          const response = await axios.post('http://localhost:8000/security/flights/cancel/', {
            "booking_id": bookingNumber,
          });
      
          
            alert("Booking cancelled successfully.");
            // Optionally reset fields
            setEnteredOtp("");
            setBookingNumber("");
            setIsVerified(false);
            setCancelButtonDisabled(true);
            sessionStorage.removeItem("otp");
          
        } catch (error) {
          console.error("Error cancelling booking:", error);
          alert("Something went wrong while cancelling the booking.");
        }
      };
 return(
    <>
    <ThemeProvider theme={theme}>
       
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
    
    <Card sx={{ maxWidth: 1200,heigth:"60px"}}>
<CardContent>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "flex-end",
    alignItems: "flex-start",
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

</CardContent>
</Card>


<Stack
  direction={{ xs: "column", sm: "column", md: "row" }}
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:5
    
  }}
>
    <img src={Plane} height="620px" width="50%" style={{borderRadius:"20px"}}/>
    <Card sx={{ maxWidth: 1000 ,backgroundColor: "#f5f5f5" }} >
    <CardContent>

        
        
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Typography variant="h2">Booking Cancellation</Typography>
    <img src={Cancelicon} style={{marginTop:"40px"}} height="100px" width="100px"/>
    <Typography variant="h5" sx={{mt:5}}>Please Enter Your Booking Number Here: </Typography>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField required fullWidth label="Booking Number" id="fullWidth" value={bookingNumber}
  onChange={(e) => setBookingNumber(e.target.value)} />
    </Box>
    <Button onClick={handleOtp}>Send Otp</Button>
    <Stack
  direction="row"
  spacing={0}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Box sx={{ width: 230, maxWidth: '100%' }}>
      <TextField required fullwidth  label="Enter OTP" id="fullWidth" value={enteredOtp}
  onChange={(e) => setEnteredOtp(e.target.value)} />
    </Box>
    <Button variant="contained" sx={{backgroundColor:'#43a047',fontSize:18}} onClick={handleVerify}>Verify</Button>
    </Stack>
    
    <Button  variant="contained" sx={{mt:2,backgroundColor:'#d50000'}} startIcon={<CancelIcon />} onClick={handleCancelBooking}
  disabled={cancelButtonDisabled}>Cancel Booking</Button>
</Stack>
        
      </CardContent>
      
    </Card>
  
</Stack>
</Stack>
    </ThemeProvider>
    
    
    </>
 )
}
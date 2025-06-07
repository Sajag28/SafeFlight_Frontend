import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Plane from '../assets/Plane5.jpg'
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
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Airplane from '../assets/Flysafe.png'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
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
export default function Reschedule() {
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
      const [date, setDate] = useState("2022-04-17");
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
      const handleRescheduleBooking = async () => {
        try {
          console.log("Booking Number:", bookingNumber);
          console.log("Booking no type: ",typeof bookingNumber);
          const response = await axios.post('http://localhost:8000/security/flights/reschedule/', {
            "booking_id": bookingNumber,
            "new_date": date,
          });
      
          
            alert("Booking Rescheduled Successfully.");
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
{/* <img src={Plane} height="620px" width="50%" style={{borderRadius:"20px"}}/> */}
<div style={{ backgroundImage: `url(${Plane})`,
              backgroundSize: "cover",  // Ensures full coverage
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "72vh",  // Covers 80% of the viewport height
              width: "100%",
              display: "flex",
              alignItems: "center",
            //   marginTop:"2%",
              justifyContent: "center"}}>

    </div>
<Stack
  direction={{ xs: "column", sm: "column", md: "row" }}
  spacing={5}
  sx={{
    justifyContent: "space-around",
    alignItems: "center",
    mt:5
    
  }}
>
    <img src={Airplane} height="400px" width="400px"/>
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
    <Typography variant="h2">Rechedule Booking</Typography>
    
    <Typography variant="h5">Please Enter Your Booking Number Here: </Typography>
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField required fullWidth label="Booking Number" id="fullWidth" value={bookingNumber}
  onChange={(e) => setBookingNumber(e.target.value)} />
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          
          'StaticDatePicker',
        ]}
      >
         <DemoItem label="Select New Date">
          <StaticDatePicker defaultValue={dayjs('2022-04-17')}  onChange={(date)=>{setDate(date ? dayjs(date).format("YYYY-MM-DD") : null)}}/>
        </DemoItem>
      </DemoContainer>
      </LocalizationProvider>
    </Box>
    
    <Button onClick={handleOtp} variant="contained">Send Otp</Button>
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
    
    <Button fullWidth variant="contained" sx={{mt:2,backgroundColor:'#d50000',blockSize:40,fontSize:20}} startIcon={<ChangeCircleIcon sx={{fontSize:20}}/>} onClick={handleRescheduleBooking}
  disabled={cancelButtonDisabled}>Reschedule Booking</Button>
</Stack>
        
      </CardContent>
      
    </Card>
  
</Stack>
</Stack>
    </ThemeProvider>
    
    
    </>
 )
}
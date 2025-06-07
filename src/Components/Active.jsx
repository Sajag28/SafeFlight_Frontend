
import Button from '@mui/material/Button';
import Booking2 from '../assets/Plane3.jpg'
import Fly from '../assets/Flysafe.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import text from '../assets/text.png'
import React, { useState,useEffect } from "react";
import Box from '@mui/material/Box';
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
import Plane from '../assets/flight4.png'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Stack
} from "@mui/material";

export default function Active() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noBookings, setNoBookings] = useState(false);
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
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const passport = sessionStorage.getItem("passport");
        console.log(passport)
        const res = await axios.post("http://localhost:8000/security/Users/Active/", {
          passport: passport
        });

        if (res.status === 200) {
          setBookings(res.data.bookings);
        } else {
          setNoBookings(true);
        }
      } catch (error) {
        setNoBookings(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Stack justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );
  }

  if (noBookings) {
    return (
      <Typography variant="h5" align="center" mt={4}>
        No Active Bookings Found.
      </Typography>
    );
  }

  return (
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
    justifyContent: "center",
    alignItems: "center",
    mt:4
  }}
>
    <div style={{ backgroundImage: `url(${Plane})`,
                  backgroundSize: "cover",  // Ensures full coverage
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "60vh",  // Covers 80% of the viewport height
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                //   marginTop:"2%",
                  justifyContent: "center"}}>

    </div>
    <Typography variant="h3">Your Active Bookings</Typography>
</Stack>
    <Grid container spacing={3} justifyContent="center" mt={4}>
      {bookings.map((booking, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, p: 2, borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                ✈️ Flight No: {booking.flight_no}
              </Typography>
              <Typography variant="h5">
                <strong>Source:</strong> {booking.source}
              </Typography>
              <Typography variant="h5">
                <strong>Destination:</strong> {booking.destination}
              </Typography>
              <Typography variant="h5">
                <strong>Date:</strong> {booking.date_of_journey}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:4
  }}
>
    <Button variant="contained" onClick={()=>{navigate('/Dashboard')}} sx={{fontSize:20}}>Go to Dashboard</Button>
    </Stack>
    </>
  );
}

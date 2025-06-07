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
import React, { useState } from "react";
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
const theme = createTheme({
    components: {
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        },
      },
    },
  });

  
const airports = [
    { label: "Indira Gandhi International Airport, Delhi (DEL)",code:"DEL" },
    { label: "Chhatrapati Shivaji Maharaj International Airport, Mumbai (BOM)",code:"BOM" },
    { label: "Kempegowda International Airport, Bangalore (BLR)",code:"BLR" },
    { label: "Chennai International Airport (MAA)" ,code:"MAA"},
    { label: "Netaji Subhas Chandra Bose International Airport, Kolkata (CCU)",code:"CCU" },
    { label: "Rajiv Gandhi International Airport, Hyderabad (HYD)",code:"HYD" },
    { label: "Cochin International Airport (COK)" ,code:"COK"},
    { label: "Dubai International Airport (DXB)",code:"DXB" },
    { label: "Heathrow Airport, London (LHR)",code:"LHR" },
    { label: "John F. Kennedy International Airport, New York (JFK)",code:"JFK" },
    { label: "Los Angeles International Airport (LAX)" ,code:"LAX"},
    { label: "Singapore Changi Airport (SIN)",code:"SIN" },
    { label: "Hong Kong International Airport (HKG)",code:"HKG" },
    { label: "Frankfurt Airport (FRA)",code:"FRA" },
    { label: "Paris Charles de Gaulle Airport (CDG)",code:"CDG" },
    { label: "Tokyo Haneda Airport (HND)",code:"HND" },
    { label: "Beijing Capital International Airport (PEK)",code:"PEK" }
  ];
export default function Flights() {
    const [travel, setTravel] = useState('');
    const navigate = useNavigate();
    const handleTravel = (event) => {
     setTravel(event.target.value);
    };
    const [sourceAirport, setSourceAirport] = useState(null);
    const [destinationAirport, setDestinationAirport] = useState(null);
    const [journeyDate, setJourneyDate] = useState(null);
    const [flights, setFlights] = useState([]);
    
    const handleSearch = async () => {
      if (!sourceAirport || !destinationAirport || !journeyDate) {
        alert("Please select all fields");
        return;
      }
  
      console.log("Source:", sourceAirport);
      console.log("Destination:", destinationAirport);
      console.log("Journey Date:", journeyDate);
      console.log("Journey Class:", travel);
      const requestData = {
        departure: sourceAirport,
        arrival: destinationAirport,
        date: journeyDate,
        travel_class: travel
      };
      try {
        const response = await axios.post("http://127.0.0.1:8000/security/flights/available/", requestData);
        setFlights(response.data.flights);
      } catch (error) {
        console.error("Error fetching flights:", error);
        alert("Failed to fetch flight data. Try again.");
      }
    };
  const [open1, setOpen1] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen1(newOpen);
  };
    const handleBookFlight = (flight) => {
        // const bookingDetails = {
        //   source: sourceAirport,
        //   destination: destinationAirport,
        //   date: journeyDate,
        //   travel_class: travel,
        //   airline: flight.flights[0].airline,
        //   flightNumber: flight.flights[0].flight_number,
        //   price: flight.price,
        //   duration: flight.total_duration
        // };
        
        sessionStorage.setItem("source",sourceAirport);
        sessionStorage.setItem("destination",destinationAirport);
        sessionStorage.setItem("date",journeyDate);
        sessionStorage.setItem("travel_class",travel);
        sessionStorage.setItem("airline",flight.flights[0].airline);
        sessionStorage.setItem("flight_number",flight.flights[0].flight_number);
        sessionStorage.setItem("price",flight.price);
        sessionStorage.setItem("duration",flight.total_duration);
        console.log(sessionStorage.getItem("source"));
        console.log(sessionStorage.getItem("destination"));
        console.log(sessionStorage.getItem("date"));
        console.log(sessionStorage.getItem("travel_class"));
        console.log(sessionStorage.getItem("airline"));
        console.log(sessionStorage.getItem("flight_number"));
        console.log(sessionStorage.getItem("price"));
        console.log(sessionStorage.getItem("duration"));
        navigate("/Booking");
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
  <div style={{ backgroundImage: `url(${Booking2})`,
          backgroundSize: "cover",  // Ensures full coverage
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "90vh",  // Covers 80% of the viewport height
          width: "100%",
          display: "flex",
          alignItems: "center",
        //   marginTop:"2%",
          justifyContent: "center",}}>
    </div>                
  <Card sx={{ maxWidth: 1500 ,mt:1,backgroundColor:'#80d8ff'}}>
     
      <CardContent>
      <ThemeProvider theme={theme}>
      
{/* <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "flex-start",
    alignItems: "center",
  }}
>
    <Typography variant="h4" sx={{mx:'auto'}}>Your Budget-Friendly Flight Finder</Typography>
</Stack> */}

<Stack
  direction={{ xs: 'column', sm: 'column' ,md:'row'}}
  spacing={2}
  sx={{
    justifyContent: "space-around",
    alignItems: "center",
  }}
>
    <img src={Airplane} height="300px" width="300px"/>

      <Stack 
      
      direction="column"
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
      >
<Typography variant="h4" sx={{mx:'auto'}}>Your Budget-Friendly Flight Finder</Typography>
<Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Autocomplete
          disablePortal
          options={airports}
          sx={{ width: 400,backgroundColor:'#fafafa' }}
          onChange={(event, newValue) => setSourceAirport(newValue ? newValue.code : null)}
          renderInput={(params) => <TextField {...params} label="Select Source Airport" />}
        />

        <Autocomplete
              disablePortal
              options={airports}
              sx={{ width: 400,backgroundColor:'#fafafa' }}
              onChange={(event, newValue) => setDestinationAirport(newValue ? newValue.code : null)}
              renderInput={(params) => <TextField {...params} label="Select Destination Airport" />}
            />
        

    
</Stack>
   
<Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Date of Journey"
                    onChange={(date) => setJourneyDate(date ? dayjs(date).format("YYYY-MM-DD") : null)}sx={{backgroundColor:'#fafafa'}}/>
      </DemoContainer>
    </LocalizationProvider>

    <Box sx={{ minWidth: 120,mt:1 ,backgroundColor:'#fafafa'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={travel}
          label="Class of Journey"
          onChange={handleTravel}
        >
          <MenuItem value="1">Economy</MenuItem>
          <MenuItem value="2">Premium Economy</MenuItem>
          <MenuItem value="3">Business</MenuItem>
          <MenuItem value="4">First</MenuItem>
        </Select>
      </FormControl>
    </Box>
 

    <Button sx={{backgroundColor:'#212121'}}onClick={handleSearch}variant="contained">Search</Button>
</Stack>
      </Stack>
      </Stack>
        </ThemeProvider>
      </CardContent>
    
    </Card>
    {/* Flight Results */}
    {flights.length > 0 && (
        
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt: 5,
  }}
>

        <Card sx={{ maxWidth: 800, mt: 5, p: 3 }}>
          <Typography sx={{textAlign:"center"}}variant="h3" >FLIGHTS FOR YOUR DESTINATION</Typography>
          <Stack spacing={2} mt={2}>
            {flights.map((flight, index) => (
              <Card key={index} sx={{ p: 2, border: "1px solid #ccc",textAlign: "center" }}>
                <Typography sx={{mx:'auto'}} variant="h6">
                  {flight.flights[0].airline} - {flight.flights[0].flight_number}
                </Typography>
                <Typography>Source: {flight.flights[0].departure_airport}</Typography>
                <Typography>Code:{flight.flights[0].departure_airport_id}</Typography>
                <Typography>Destination: {flight.flights[0].arrival_airport}</Typography>
                <Typography>Code:{flight.flights[0].arrival_airport_id}</Typography>
                <Typography>Duration(In Minutes): {flight.total_duration}</Typography>
                <Typography>Price(INR): {flight.price}</Typography>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleBookFlight(flight)}
                >
                  Book Flight
                </Button>
              </Card>
            ))}
          </Stack>
        </Card>
        </Stack>
      )}
  </>

)


}    
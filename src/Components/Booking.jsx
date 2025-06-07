import React, { useState,useEffect } from "react";
import TextField from '@mui/material/TextField';
import Plane from '../assets/Plane4.jpg'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Flight from '../assets/Airplane1.png'
import Lock from '../assets/Security.png'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import {useNavigate} from 'react-router-dom'
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

export default function Booking() {
    const navigate = useNavigate();
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [travel_class, setTravel] = useState('');
    const [airline, setAirline] = useState('');
    const [flight_number, setFlight] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [passenger_count, setPassengerCount] = useState(1);
    const [passengers, setPassengers] = useState([{ firstname: "",middlename:"",lastname:"", age: "",gender:"",passport:"" ,mobile:"" }]);
    const [cl,setCl]=useState("Economy")
    const [formData, setFormData] = useState({
        address: "",
        adults: "",
        children: "",
        passengers: "",
        securityQ1: "",
        securityA1: "",
        securityQ2: "",
        securityA2: "",
        securityQ3: "",
        securityA3: "",
      });
      const [totalPrice, setTotalPrice] = useState(0);
      const handleChange = (e) => {
     console.log("changed")
      const  {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "passengers") {
            const numPassengers = parseInt(value, 10) || 0;
            setTotalPrice(numPassengers * price);
          }
      };
    const increasePassengerCount = () => {
      setPassengerCount((prev) => prev + 1);
      setPassengers([...passengers, { firstname: "",middlename:"",lastname:"", age: "",gender:"",passport:"" ,mobile:""}]);
    };
  
    const decreasePassengerCount = () => {
      if (passenger_count > 1) {
        setPassengerCount((prev) => prev - 1);
        setPassengers(passengers.slice(0, -1));
      }
    };
    const handleInputChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
      };
  useEffect(() => {
    // Retrieve from session storage
     const s=sessionStorage.getItem("source");
    setSource(s);
    const d=sessionStorage.getItem("destination");
    setDestination(d);
    const dt=sessionStorage.getItem("date");
    setDate(dt);
    const tc=sessionStorage.getItem("travel_class");
    setTravel(tc);
    const al=sessionStorage.getItem("airline");
    setAirline(al);
    const fn=sessionStorage.getItem("flight_number");
    setFlight(fn);
    const pr=sessionStorage.getItem("price");
    setPrice(pr);
    const du=sessionStorage.getItem("duration");
    setDuration(du);
    if(tc==="1"){
        setCl("Economy")
    }
    else if(tc==="2"){
        setCl("Premium Economy")
    }
    else if(tc==="3"){
        setCl("Business")
    }
    else if(tc==="4"){
        setCl("First Class")}

  }, []);
  const handleBooking = async () => {
    const bookingData = {
      passport:sessionStorage.getItem("passport"),
      user_name: sessionStorage.getItem("name"), // Replace with actual user data
      flight_no: flight_number,
      user_mail: sessionStorage.getItem("email"), // Replace with actual user email
      source_airport: source,
      destination_airport: destination,
      date_of_journey: date,
      class_of_journey: cl,
      price:price,
      passengers: passengers,
      num_adults: formData.adults,
      num_children: formData.children,
      security_questions: [formData.securityQ1, formData.securityQ2, formData.securityQ3],
      security_answers: [formData.securityA1, formData.securityA2, formData.securityA3],
    };

    try {
      const response = await axios.post("http://localhost:8000/security/flights/book/", bookingData);
      if (response.status === 201) {
        const data= response.data;
        const booking_id= data.booking_id;
        sessionStorage.setItem("booking_id", booking_id);
        console.log("Booking Successful:", response.data);
        console.log(sessionStorage.getItem("booking_id"))
        
        navigate("/BookNav"); // Navigate to confirmation page
      }
    } catch (error) {
      console.error("Booking Failed:", error.response?.data || error.message);
      alert("Booking Failed. Please try again.");
    }
  };
return(
    <>
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
    <ThemeProvider theme={theme}>
       
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
     
    <Typography variant="h3" sx={{mt:2}}>FLIGHT RESERVATION PORTAL</Typography>
    
    <Card sx={{ maxWidth: 600,textAlign:'center',mt:2}}>

      <CardContent>
    
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}
>

    <img src={Flight} height="100px" width="100px"/>


<Stack
  direction="column"
  spacing={1}
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
  }}
>

      <Typography variant="h4">{source} to {destination}</Typography>
    <Typography variant="h4">Date: {date}</Typography>
    <Typography variant="h4">Flight Number: {flight_number}</Typography>
    <Typography variant="h4">Airline: {airline}</Typography>
    <Typography variant="h4">Duration: {duration} minutes</Typography>
    </Stack>
</Stack>
      </CardContent>
      
    </Card>
    <Typography variant="h5">Please Enter the Details as per your passport and all other documents</Typography>

</Stack>

  

    <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}>
        {passengers.map((passenger, index) => (
          <Card key={index} sx={{ maxWidth: 800, p: 2, backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6">Passenger {index + 1}</Typography>

<Stack
  direction={{ xs: "column", sm: "column",md:'row' }} // Stack direction changes based on screen size
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={passenger.firstname}
                required
                onChange={(e) => handleInputChange(index, "firstname", e.target.value)}
                sx={{ mt: 1 }}
              />
              <TextField
                fullWidth
                label="Middle Name"
                variant="outlined"
                value={passenger.middlename}
                onChange={(e) => handleInputChange(index, "middlename", e.target.value)}
                sx={{ mt: 1 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={passenger.lastname}
                required
                onChange={(e) => handleInputChange(index, "lastname", e.target.value)}
                sx={{ mt: 1 }}
              />
              </Stack>
              <Stack
  direction={{ xs: "column", sm: "column",md:'row' }} // Stack direction changes based on screen size
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt: 2,
  }}
>
              <TextField
                fullWidth
                label="Age"
                variant="outlined"
                value={passenger.age}
                required
                onChange={(e) => handleInputChange(index, "age", e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Gender"
                variant="outlined"
                value={passenger.gender}
                required
                onChange={(e) => handleInputChange(index, "gender", e.target.value)}
                sx={{ mt: 2 }}
              />
            </Stack>
               <TextField
                fullWidth
                label="Passport Number"
                variant="outlined"
                value={passenger.passport}
                required
                onChange={(e) => handleInputChange(index, "passport", e.target.value)}
                sx={{ mt: 2 }}
              />
                <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                value={passenger.mobile}
                required
                onChange={(e) => handleInputChange(index, "mobile", e.target.value)}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Buttons to Increase/Decrease Passenger Count */}
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center", mt: 3 }}>
        <Button variant="contained" sx={{backgroundColor:'#f44336'}} onClick={decreasePassengerCount} disabled={passenger_count === 1}>
          Reduce Passenger
        </Button>
        <Typography variant="h6">{passenger_count}</Typography>
        <Button variant="contained" color="primary" onClick={increasePassengerCount}>
          Add Passenger
        </Button>
      </Stack>
    
      
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:5
  }}
>

<Card sx={{ maxWidth: 1000 }}>
<CardContent>
<TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-between",
    alignItems: "center",
    mt:5
  }}
>
<TextField
                fullWidth
                label=" No of Adults"
                variant="outlined"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
<TextField
                fullWidth
                label="No of Children"
                variant="outlined"
                name="children"
                value={formData.children}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
<TextField
                fullWidth
                label=" No of Passengers"
                variant="outlined"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                required
                sx={{ mt: 2 }}
              />
        </Stack>
        </CardContent>
        </Card>
        <Typography variant="h3" sx={{mt:4}}>Please Enter the Security Questions</Typography>
        </Stack>
        <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:4
  }}
>
<img src={Lock} height="200px" width="200px"/>
        <Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    ml:5
  }}
>

{[1, 2, 3].map((num) => (
            <Stack key={num} direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center", mt: 2 }}>
              <TextField
                fullWidth
                label={`Security Question ${num}`}
                multiline
                rows={4}
                name={`securityQ${num}`}
                value={formData[`securityQ${num}`]}
                onChange={handleChange}
                variant="standard"
              />
              <TextField
                fullWidth
                label={`Security Answer ${num}`}
                multiline
                rows={4}
                name={`securityA${num}`}
                value={formData[`securityA${num}`]}
                onChange={handleChange}
                variant="standard"
              />
            </Stack>
          ))}
        
</Stack>
</Stack>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:2
  }}
>
    <Typography variant="h4">Class:{cl}</Typography>
    <Typography variant="h4">Total Price(INR): {totalPrice}</Typography>

</Stack>

<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:5
  }}
>

<Button variant="contained" startIcon={<AirplaneTicketIcon sx={{fontSize:20}} />} sx={{fontSize:20}} onClick={handleBooking}>
  Book Ticket
</Button>
</Stack>
      </ThemeProvider>
    </>
)


}
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
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
import Booking from '../assets/Booking.jpg'
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
    { label: "Indira Gandhi International Airport, Delhi (DEL)" },
    { label: "Chhatrapati Shivaji Maharaj International Airport, Mumbai (BOM)" },
    { label: "Kempegowda International Airport, Bangalore (BLR)" },
    { label: "Chennai International Airport (MAA)" },
    { label: "Netaji Subhas Chandra Bose International Airport, Kolkata (CCU)" },
    { label: "Rajiv Gandhi International Airport, Hyderabad (HYD)" },
    { label: "Cochin International Airport (COK)" },
    { label: "Dubai International Airport (DXB)" },
    { label: "Heathrow Airport, London (LHR)" },
    { label: "John F. Kennedy International Airport, New York (JFK)" },
    { label: "Los Angeles International Airport (LAX)" },
    { label: "Singapore Changi Airport (SIN)" },
    { label: "Hong Kong International Airport (HKG)" },
    { label: "Frankfurt Airport (FRA)" },
    { label: "Paris Charles de Gaulle Airport (CDG)" },
    { label: "Tokyo Haneda Airport (HND)" },
    { label: "Beijing Capital International Airport (PEK)" }
  ];
export default function Flights() {
return(
  <>

<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

  <div style={{
          backgroundImage: `url(${Booking})`,  // Use the imported image
          backgroundSize: "cover",  // Ensures the image covers the whole viewport
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "fixed",  // Keeps background fixed on scroll
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",  // Covers the full viewport
          zIndex: -1, 
      }}>
  <Card sx={{ maxWidth: 1500 }}>
     
      <CardContent>
      <ThemeProvider theme={theme}>
      <Stack>
      
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Autocomplete
          disablePortal
          options={airports}
          sx={{ width: 400 }}
          renderInput={(params) => <TextField {...params} label="Select Source Airport" />}
        />

        <Autocomplete
              disablePortal
              options={airports}
              sx={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="Select Destination Airport" />}
            />
        

    
</Stack>
   
<Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Date of Journey" />
      </DemoContainer>
    </LocalizationProvider>

    <Button variant="contained">Search</Button>
</Stack>
      </Stack>
        </ThemeProvider>
      </CardContent>
    
    </Card>
    </div>
    </Stack>
   
  </>

)


}    
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {React,useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fly from '../assets/Flysafe.png'
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});


export default function BookNav() {
const navigate = useNavigate();
const [booking_id, setBookingid] = useState("");
useEffect(() => {
    const booking = sessionStorage.getItem("booking_id");
    setBookingid(booking);
    console.log("Booking id is: ",booking_id);
},[])
const handleHome = () => {
    localStorage.removeItem("booking_id");
    navigate("/Dashboard");
}

return(
    <>
    <ThemeProvider theme={theme}>
      
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:15
  }}
>
<img src={Fly} height="200px" width="200px"/>
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
 <Typography variant="h4" component="div">Your Booking on the way to confirm:{booking_id}</Typography>
 <Typography variant="h4" component="div">You will soon recieve mail once its confirmed</Typography>
 <Button variant="contained" onClick={handleHome} sx={{fontSize:25}}>HomePage</Button>
</Stack>

    </CardContent>

</Card>
</Stack>

    </ThemeProvider>
    </>
)
}
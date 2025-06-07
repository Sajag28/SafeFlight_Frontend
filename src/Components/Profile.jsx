import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React,{useState,useEffect} from "react"
import axios from "axios"
import Man from '../assets/man.png'
import Woman from '../assets/woman2.png'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Fly from '../assets/Flysafe.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Box from '@mui/material/Box';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import {useNavigate} from "react-router-dom"
const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export default function Profile() {
  const navigate=useNavigate()
  const [name,setName]=useState('')
  const [age,setAge]=useState('')
  const [gender,setGender]=useState('')
  const [email,setEmail]=useState('')
  const [passport,setPassport]=useState('')
  const [home,setHome]=useState('')
  const [aadhaar,setAadhaar]=useState('')
  const [pan,setPan]=useState('')
  const [profession,setProfession]=useState('')
  const [office,setOffice]=useState('')
  const [digilocker,setDigilocker]=useState('')
  const [surgery,setSurgery]=useState('')
  const [marital,setMarital]=useState('')
  const [verified,setVerified]=useState('')

  useEffect(() => {
    const fetchData = async () => {
      const storedName = sessionStorage.getItem("name");
      const storedAge = sessionStorage.getItem("age");
      const storedGender = sessionStorage.getItem("gender");
      const storedEmail = sessionStorage.getItem("email");
      const storedPassport = sessionStorage.getItem("passport");
  
      setName(storedName);
      setAge(storedAge);
      setGender(storedGender);
      setEmail(storedEmail);
      setPassport(storedPassport);
  
      try {
        const res = await axios.post("http://localhost:8000/security/Users/Details/", {
          passport: storedPassport
        });
  
        if (res.status === 200) {
          setHome(res.data.Home);
          setAadhaar(res.data.Aadhaar);
          setPan(res.data.Pan);
          setProfession(res.data.Profession);
          setOffice(res.data.Office);
          setDigilocker(res.data.Digilocker);
          setSurgery(res.data.Surgery);
          setMarital(res.data.Marital);
          setVerified(res.data.Verified);
        } else {
          console.log("Problems with the details");
        }
  
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
  
      console.log(storedName, storedAge);
    };
  
    fetchData();
  }, []);
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
<Typography sx={{}} variant="h5">FLY SAFE WITH US</Typography>
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
    justifyContent: "flex-end",
    alignItems: "flex-start",
    mt:4,
    mr:2
  }}
>
    <Button variant="outlined" endIcon={<EditDocumentIcon/>} onClick={()=>{navigate('/Edit')}}>Edit Profile</Button>
</Stack>
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    mt:6
  }}
>


<Card sx={{ maxWidth: 1000 }}>
      
      <CardContent>

<Stack
  direction={{xs:"column",sm:"column",md:"row"}}
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

       <img src={(gender==="Male")? Man : Woman} height="400px" width="400px"/>
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Typography variant="h5">Name: {name}</Typography>
    <Typography variant="h5">Age: {age}</Typography>
    <Typography variant="h5">Gender: {gender}</Typography>
    <Typography variant="h5">Email: {email}</Typography>
    <Typography variant="h5">Passport: {passport}</Typography>
    <Typography variant="h5">Home Address: {home}</Typography>
    <Typography variant="h5">Aadhaar Number: {aadhaar}</Typography>
    <Typography variant="h5">PAN Number: {pan}</Typography>
    <Typography variant="h5">Profession: {profession}</Typography>
    <Typography variant="h5">Office: {office}</Typography>
    <Typography variant="h5">Digilocker: {digilocker}</Typography>
    <Typography variant="h5">Surgery: {surgery}</Typography>
    <Typography variant="h5">Marital Status: {marital}</Typography>
    <Typography variant="h5">Verified: {verified}</Typography>
</Stack>
</Stack>
      </CardContent>
      
    </Card>
    <Button variant="contained" sx={{fontSize:18}} onClick={()=>{navigate('/Dashboard')}}>Dashboard</Button>
</Stack> 
    </ThemeProvider>
  );
}

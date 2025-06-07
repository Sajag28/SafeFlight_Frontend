import {createBrowserRouter,RouterProvider} from "react-router-dom";
import React from "react";
import Dashboard from "./Components/Dashboard.jsx";
import Flights from "./Components/Flights.jsx";
import Booking from "./Components/Booking.jsx";
import BookNav from "./Components/BookNav.jsx";
import Cancel from "./Components/Cancel.jsx";
import Reschedule from "./Components/Reschedule.jsx";
import Details from "./Components/Details.jsx";
import Signup from "./Components/Usersignup.jsx"
import Login from "./Components/Login.jsx"
import Profile from "./Components/Profile.jsx"
import Edit from "./Components/Edit.jsx"
import Active from "./Components/Active.jsx"
import Cancelled from "./Components/Cancelled.jsx"
export default function App() {

const router=createBrowserRouter([

{
  path: '/Dashboard',
  element: <Dashboard/>
  
},{
  path: '/Flights',
  element: <Flights/>
},{
  path: '/Booking',
  element: <Booking/>
},{
  path: '/BookNav',
  element: <BookNav/>
},{
  path:'/Cancel',
  element:<Cancel/>
},{
  path:'/Reschedule',
  element:<Reschedule/>
},{
  path:'/Details',
  element:<Details/>
},{
  path:'/',
  element:<Signup/>
},{
  path:'/Login',
  element:<Login/>
},{
  path:'/Profile',
  element:<Profile/>
},{
  path:'/Edit',
  element:<Edit/>
},{
  path:'/Active',
  element:<Active/>
},{
  path:'/Cancelled',
  element:<Cancelled/>
}
])
  return (
    <RouterProvider router={router} />
  );


} 
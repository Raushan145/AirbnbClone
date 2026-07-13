import React, { useContext } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { userDataContext } from './Context/UserContext'
import MyListing from './pages/MyListing'
import ViewPage from './pages/ViewPage'
import MyBooking from './pages/MyBooking'
import ReservationsList from './pages/ReservationsList'
import Booked from './pages/Booked'
import PageNotFound from './Component/PageNotFound'
import ListingDetails from './pages/Become a Host/ListingDetails'
import CheckOut from './pages/Payments/CheckOut'
import PaymentSuccess from './pages/PaymentSuccess'

// export const ServerURL = "https://airbnbclone-backend-paga.onrender.com";
export const ServerURL = "http://localhost:8080";

const App = () => {
  const {userData} = useContext(userDataContext)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       {/* <Route path="/" element={<CheckOut />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/listingsss" element={<ListingDetails />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/logout" element={<Navigate to="/"/>} />
      <Route path="/listingpage1" element={userData != null ? <ListingPage1 /> : <Navigate to={"/signin"} />} />
      <Route path="/mylisting" element={ <MyListing />}/>
      <Route path="/mybooking" element={ <MyBooking />}/>
      <Route path="/check-out" element={ <CheckOut />}/>
      <Route path="/booked" element={ <Booked />}/>
      <Route path="/payment-sucess-booking-recipt" element={ <PaymentSuccess />}/>
      <Route path="/reservations-Dashboard" element={ <ReservationsList />}/>
      <Route path="/listing/:id" element={<ViewPage />} />
      <Route path="/listingpage2" element={<ListingPage2 />} />
      <Route path="/listingpage3" element={<ListingPage3 />} />
      <Route path="/listingpage3" element={<ListingPage3 />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element= {<PageNotFound />} />
    </Routes>
  )
}

export default App

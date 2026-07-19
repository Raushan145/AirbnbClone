import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import AuthContext from './Context/AuthContext.jsx'
import UserContext from './Context/UserContext.jsx'
import ListingContex from './Context/ListingContex.jsx'
import BookingContext from './Context/BookingContext.jsx'
import { ReviewProvider } from './Context/ReviewContext.jsx'
import 'react-loading-skeleton/dist/skeleton.css'
import RazorpayContext from './Context/RazorpayContext.jsx'
import ReservationContext from './Context/ReservationContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthContext>
        <ListingContex>
         <UserContext>
            <ReservationContext>
               <BookingContext>        
                  <ReviewProvider>
                     <RazorpayContext>
                        <App />
                     </RazorpayContext>
                  </ReviewProvider>
               </BookingContext>
            </ReservationContext>
         </UserContext> 
        </ListingContex>
      </AuthContext>
     <ToastContainer position='top-right' autoClose={2000} newestOnTop pauseOnHover   theme="light" style={{top:"40px", right:"16px", left:"auto", width:"320px"}}  />
  </BrowserRouter>
  
 
)

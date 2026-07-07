import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import AuthContext from './Context/AuthContext.jsx'
import UserContext from './Context/UserContext.jsx'
import ListingContex from './Context/ListingContex.jsx'
import BookingContext from './Context/BookingContext.jsx'
import { ReviewProvider } from './Context/ReviewContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <AuthContext>
        <ListingContex>
         <UserContext>
            <BookingContext>        
               <ReviewProvider>
                  <App />
               </ReviewProvider>
            </BookingContext>
         </UserContext> 
        </ListingContex>
      </AuthContext>
     <ToastContainer />
  </BrowserRouter>
  
 
)

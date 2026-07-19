import express from 'express'
import isAuth from '../middlewares/isAuth.js';
import {  cancelBooking, createBooking, getBookingsForHost, getBookingsForListing, deleteBooking, checkoutBooking, updateBookingPayment, checkInBooking } from '../controllers/bookingController.js';

let bookingRouter = express.Router();

bookingRouter.post("/create/:id",isAuth, createBooking)
bookingRouter.get("/host",isAuth, getBookingsForHost)
bookingRouter.get("/listing/:id",isAuth, getBookingsForListing)
bookingRouter.delete("/cancle/:id",isAuth, cancelBooking)
bookingRouter.patch("/payment/update/:bookingId",isAuth, updateBookingPayment)
bookingRouter.delete("/delete/:id",isAuth, deleteBooking)
bookingRouter.patch("/checkIn/:id", checkInBooking);
bookingRouter.patch("/checkout/:id", checkoutBooking);

export default bookingRouter
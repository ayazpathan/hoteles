import Booking from "../models/booking";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// Create new bookingr => api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: new Date(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

// Check room booking availability => api/bookings/check
const checkRoomBookingAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;

  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  });

  // Check if there is any booking available?
  let isAvailable;

  if (bookings && bookings.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

// Check booked dates of a room => api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsyncErrors(async (req, res) => {
  let { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });

  let bookedDates = [];

  bookings.forEach((booking) => {
    const range = moment.range(
      moment(booking.checkInDate),
      moment(booking.checkOutDate)
    );

    const dates = Array.from(range.by("day"));
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

export { newBooking, checkRoomBookingAvailability, checkBookedDatesOfRoom };

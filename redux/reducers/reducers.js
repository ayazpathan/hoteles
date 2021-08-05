import { combineReducers } from "redux";
import { allRoomReducer, roomDetailsReducer } from "./roomReducers";
import {
  authReducer,
  userReducer,
  loadedUserReducer,
  forgotPasswordReducer,
} from "./userReducer";

import {
  checkBookingReducer,
  bookedDatesReducer,
  bookingsReducer,
  bookingDetailsReducer,
} from "./bookingReducer";

const reducer = combineReducers({
  allRooms: allRoomReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
  checkBooking: checkBookingReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
});

export default reducer;

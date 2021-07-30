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
});

export default reducer;

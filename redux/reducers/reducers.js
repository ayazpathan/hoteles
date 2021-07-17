import { combineReducers } from "redux";
import { allRoomReducer, roomDetailsReducer } from "./roomReducers";
import {
  authReducer,
  userReducer,
  loadedUserReducer,
  forgotPasswordReducer,
} from "./userReducer";

const reducer = combineReducers({
  allRooms: allRoomReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  loadedUser: loadedUserReducer,
  forgotPassword: forgotPasswordReducer,
});

export default reducer;

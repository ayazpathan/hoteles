import { combineReducers } from "redux";
import { allRoomReducer, roomDetailsReducer } from "./roomReducers";
import { authReducer } from "./userReducer";

const reducer = combineReducers({
  allRooms: allRoomReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
});

export default reducer;

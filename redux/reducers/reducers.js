import { combineReducers } from "redux";
import { allRoomReducer, roomDetailsReducer } from "./roomReducers";

const reducer = combineReducers({
  allRooms: allRoomReducer,
  roomDetails: roomDetailsReducer,
});

export default reducer;

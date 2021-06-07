import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  CLEAR_ERRORS,
  ROOMS_DETAILS_SUCCESS,
  ROOMS_DETAILS_FAIL,
} from "../constants/roomConstants";

// Get all rooms
export const getRooms =
  (req, currentPage = 1, location = "") =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(
        `${origin}/api/rooms?page=${currentPage}&location=${location}`
      );

      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAIL,
        payload: error,
      });
    }
  };

// Clear Errors
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Get room details
export const getRoomDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    const { data } = await axios.get(`${origin}/api/rooms/${id}`);

    dispatch({
      type: ROOMS_DETAILS_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: ROOMS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

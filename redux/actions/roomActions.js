import axios from "axios";
import absoluteUrl from "next-absolute-url";
import {
  ALL_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  CLEAR_ERRORS,
  ROOMS_DETAILS_SUCCESS,
  ROOMS_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  REVIEW_AVAILABLITY_REQUEST,
  REVIEW_AVAILABLITY_SUCCESS,
  REVIEW_AVAILABLITY_FAIL,
} from "../constants/roomConstants";

// Get all rooms
export const getRooms =
  (req, currentPage = 1, location = "", guests, category) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);
      let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;
      if (guests) link = link.concat(`&guestCapacity=${guests}`);
      if (category) link = link.concat(`&category=${category}`);
      const { data } = await axios.get(link);

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

// Get room details
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/reviews`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get room review availability
export const checkReviewAvaiilability = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_AVAILABLITY_REQUEST });

    const { data } = await axios.get(
      `/api/reviews/check_review_availablity?roomId=${roomId}`
    );

    dispatch({
      type: REVIEW_AVAILABLITY_SUCCESS,
      payload: data.isReviewAvailable,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_AVAILABLITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

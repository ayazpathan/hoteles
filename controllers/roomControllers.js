import Room from "../models/room";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Fetch all rooms from the database
const allRoom = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;
  const roomsCount = await Room.countDocuments();

  const apiFeature = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeature.query;
  let filteredRoomCount = rooms.length;

  apiFeature.pagination(resPerPage);
  rooms = await apiFeature.query;

  res
    .status(200)
    .json({ success: true, roomsCount, resPerPage, filteredRoomCount, rooms });
});

// Create new room => api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(200).json({
    success: true,
    room,
  });
});

// Get single room details => api/rooms/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    room,
  });
});

// Update room details => api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

// Delete room details => api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this ID", 404));
  }

  room = await room.remove();

  res.status(200).json({
    success: true,
    message: "Room has successflyy ben deleted",
  });
});

export { allRoom, newRoom, getSingleRoom, updateRoom, deleteRoom };

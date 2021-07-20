import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  amoutPaid: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Booking ||
  mongoose.models("Booking", bookingSchema);

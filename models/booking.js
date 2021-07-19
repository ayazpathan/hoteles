import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
  },
});

export default mongoose.models.Booking ||
  mongoose.models("Booking", bookingSchema);

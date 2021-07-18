import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({});

export default mongoose.models.Booking ||
  mongoose.models("Booking", bookingSchema);

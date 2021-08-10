import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import absolute from "next-absolute-url";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Generate stripe checkout session => /api/checkout/:roomId
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
  // Get room details
  const room = await Room.findById(req.query.roomId);

  const { checkIndate, checkOutDate, daysOfStay } = req.query;

  // Get origin
  const { origin } = sbsoluteUrl(req);

  // Create stripe chekcout session
  const session = await stripe.stripeCheckoutSession.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata={
        checkIndate,
        checkOutDate,
        daysOfStay
    },
    line_items: [
        {
            name: room.name,
            images: [`${room.images[0].url}`],
            amount: req.query.amount * 100,
            currency: "inr",
            quantity: 1
        }
    ]
  });

  res.status(200).json(session);
});

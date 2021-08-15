import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";
import getRawBody from "raw-body";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import sbsoluteUrl from "next-absolute-url";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Generate stripe checkout session => /api/checkout/:roomId
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {
  // Get room details
  const room = await Room.findById(req.query.roomid);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  // Get origin
  const { origin } = sbsoluteUrl(req);

  // Create stripe chekcout session => /api/checkout_session/:roomId
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomid,
    metadata: {
      checkInDate,
      checkOutDate,
      daysOfStay,
    },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "inr",
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});

// Create new booking after payment => /api/webhook
const webhookCheckout = catchAsyncErrors(async (req, res) => {
  const rawBody = await getRawBody(req);
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;

      const amountPaid = session.amount_total / 100;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });
    }
  } catch (error) {
    console.log(`ERROR while booking ${error}`);
  }

  res.status(200).json({
    success: true,
  });
});

export { stripeCheckoutSession, webhookCheckout };

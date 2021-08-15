import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

// This is a helper function to create checkout sessions
const getStripe = () => {
  console.log(`STRIPE API KKEY - ${process.env.STRIPE_API_KEY}`);
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_API_KEY);
  }

  return stripePromise;
};

export default getStripe;

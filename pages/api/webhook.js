import nc from "next-connect";
import dbConnect from "../../config/dbConnect";
import { webhookCheckout } from "../../controllers/paymentController";

const handler = nc();

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler;

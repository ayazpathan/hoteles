import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { createRoomReview } from "../../../controllers/roomControllers";

import { isAuthenticatedUser } from "../../../middlewares/auth";
import onError from "../../../middlewares/errors";

const handler = nc();

dbConnect();

handler.use(isAuthenticatedUser).put(createRoomReview);

export default handler;

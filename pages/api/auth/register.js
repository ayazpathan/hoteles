import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { registerUser } from "../../../controllers/authController";

const handler = nc();

dbConnect();

handler.post(registerUser);

export default handler;

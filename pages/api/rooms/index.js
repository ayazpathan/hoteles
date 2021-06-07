import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { allRoom, newRoom } from "../../../controllers/roomControllers";

const handler = nc();

dbConnect();

handler.get(allRoom);

handler.post(newRoom);

export default handler;

const Room = require("../models/room");
const mongoose = require("mongoose");
const rooms = require("../data/rooms");

mongoose
  .connect(
    "mongodb+srv://azzzpathan:lW8Mt3y0G8hvFNP1@cluster0.k4frq.mongodb.net/hotele?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then((con) => console.log("Connected to MongoDB Atlas"));

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms have been deleted");

    await Room.insertMany(rooms);
    console.log("Rooms have been inserted successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();

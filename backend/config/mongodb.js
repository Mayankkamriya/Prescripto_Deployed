import mongoose from "mongoose";

const connectDB = async () => {
    // Listening to mongoose connection events
    mongoose.connection.on('connected', () => console.log("Database Connected"));

    // in process.env.MONGODB_URL already contain the database name
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("MongoDB connected successfully");
  } 
export default connectDB;


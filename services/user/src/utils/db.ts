import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI;

async function connectDb() {
  try {
    await mongoose.connect(mongo_uri as string);
    console.log("connected to mongodb");
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDb;

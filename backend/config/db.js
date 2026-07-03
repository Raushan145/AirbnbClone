import mongoose from "mongoose";

const connectDB = async () => {
  try {
      console.log(process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ Database Connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
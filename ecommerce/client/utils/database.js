import mongoose from "mongoose";
export default async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://dred1:redwan123@cluster0.u9y0hra.mongodb.net/web2?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log("error on connecting to DB");
  }
}

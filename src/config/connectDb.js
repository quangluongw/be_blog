import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://quang20042204:sJnNlNJBsdpmGbTD@cluster0.xk6mqgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then();
    
    console.log("connect thành công");
  } catch (error) {
    console.log(error);
  } 
};

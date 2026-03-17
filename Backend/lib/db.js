import mongoose from 'mongoose';
import { ENV } from './env.js';





export const connectDB= async () =>{
    try{
        const {MONGO_URI} =ENV;


       const conn= await mongoose.connect(ENV.MONGO_URI)
        console.log("Database connected successfully", conn.connection.host);

    }catch(err){
        console.error("Error connecting to database:", err)
        process.exit(1); // 1 indicates an error occurred 0 indicates success
    }
}
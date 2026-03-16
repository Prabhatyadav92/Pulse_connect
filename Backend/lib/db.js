import mongoose from 'mongoose';





export const connectDB= async () =>{
    try{
       const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully", conn.connection.host);

    }catch(err){
        console.error("Error connecting to database:", err)
        process.exit(1); // 1 indicates an error occurred 0 indicates success
    }
}
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb= async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMONGO DB CONNECTED SUCCESFULLY !! DB HOST: ${connectionInstance.connection.host}` );
    } catch (error) {
        console.log("Mongo Db error ", error);
        process.exit(1)
    }
}

export default connectDb;
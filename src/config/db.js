import mongoose from "mongoose";

export default async function ConnectDB(){

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Atlas mongoo connected");
    } catch (error) {
        console.error(error || "DB Error");
    }

};





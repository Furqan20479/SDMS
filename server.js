import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import app from "./src/app.js";


dotenv.config();

connectDB();



const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`server connected on port ${port}`));




import mongoose from "mongoose";


// DailySale mein Product ka data duplicate nahi karna, sirf Product ki _id reference rakhni hai.❤️


const dailySaleSchema = new mongoose.Schema({
    date:{type:Date, default:Date.now},
    booker:{type:String,required:true},
    shop:{type:String,required:true},
    product:{type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    cartons:{type:Number,required:true},
    pieces:{type:Number,required:true},
    remarks:{type:String,required:true},
});

const DailySale = mongoose.model("DailySale", dailySaleSchema);
export default DailySale;


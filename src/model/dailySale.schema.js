import mongoose from "mongoose";

const dailySaleSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },

        booker: {
            type: String,
            required: true
        },

        shop: {
            type: String,
            required: true
        },

        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                pieces: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],

        totalPieces: {
            type: Number,
            default: 0
        },

        amount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const DailySale = mongoose.model("DailySale", dailySaleSchema);

export default DailySale;
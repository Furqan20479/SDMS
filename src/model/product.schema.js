import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        flavour: {
            type: String,
            required: true,
            trim: true
        },

        gram: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

// Filename SchemaName ModelName -> CollectionName

 
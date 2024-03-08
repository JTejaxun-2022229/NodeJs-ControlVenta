import mongoose, { Schema } from "mongoose";

const ProductSchema = mongoose.Schema({

    productName: {
        type: String,
        required: [true, "productName is neccessary"],
        unique: true
    },
    details: {
        type: String
    },
    unitPrice: {
        type: Number,
        required: [true, "Unitprice is neccessary"]
    },
    stock: {
        type: Number,
        required: [true, "Stock is necessary"],
    },
    category: {
        type: Schema,
        ref: 'category',
        enum: [],
        default: "Product"
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
}
);

export default mongoose.model('Product', ProductSchema);
import  mongoose from "mongoose";

const ProductSchema = mongoose.Schema({

    productName: {
        type: String,
        required: [true, "productName is neccessary"]
    },
    brand: {
        type: String,
        required: [true, "Brand is neccessary"]
    },
    details: {
        type: String
    },
    unitPrice: {
        type: Number,
        required: [true, "Unit price is neccessary"]
    },
    dueDate: {
        type: Date
    },
    stock: {
        type: Number,
        required: [true, "Stock is necessary"],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: category,
        required: [true, "Category is neccessary"],
        default: "No Category"
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false
});

export default mongoose.model('Product', ProductSchema);
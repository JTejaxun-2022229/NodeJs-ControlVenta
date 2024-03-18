import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({

    categoryName: {
        type: String,
        required: [true, "CategoryName is necessary"],
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Category', CategorySchema);


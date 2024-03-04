import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is necessary"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is necessary"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is necessary"]
    },
    role:{
        type: String,
        default: "ADMIN_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    },

});

AdminSchema.methods.toJSON = function () {
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return user;
}

export default mongoose.model('Admin', AdminSchema); 
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Name is neccessary']
    },
    email: {
        type: String,
        require: [true, 'Email is neccesary'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password is neccessary']
    },
    receipts:{
        type: Array
    },
    status:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('User', UserSchema);
import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Role is neccesary']
    }
});

export default mongoose.model('Role', RoleSchema);
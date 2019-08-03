import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Please fill in a name",
        trim: true
    },
    position: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
        required: "Please fill in an email"
    },
    dob: {
        type: Date,
        required: "Please fill in an date of birth"
    },
    photo: {
        type: String
    },
    nextDob: {
        type: Date,
    },
}, {
    timestamps: true
});

export default mongoose.model('Employee', EmployeeSchema);

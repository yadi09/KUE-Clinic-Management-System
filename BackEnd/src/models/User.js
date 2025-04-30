import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin", "doctor", "receptionist"],
        required: [true, 'Role is required'],
    }
}, {
    timestamps: true
});

// Get all users
userSchema.statics.getAllUsers = async function () {
    return await this.find();
}

// Get all doctors
userSchema.statics.getAllDoctors = async function () {
    return await this.find({ role: "doctor" });
}

// Hash password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generate JWT token
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({
        id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
    },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export default mongoose.model("User", userSchema);
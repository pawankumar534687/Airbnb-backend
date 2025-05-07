import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
       unique: true,
       sparse: true,
    },
    phone:{
        type: String,
        unique: true,
        sparse: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]

    },
    password:{
        type: String,
        required: true,
    },

}, {timestamps : true});

const User = mongoose.model("User", userSchema)

export default User
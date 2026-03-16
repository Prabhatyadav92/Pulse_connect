import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    password: {
        type: String,
        
        unique: true,
        minlength: 6
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    fullName:{
        type: String,
        required: true,

    },

    profilePic:{
        type: String,
        default: ""
    }
    } ,{timestamps: true});


    const User= mongoose.model('User',userSchema);
    export default User;

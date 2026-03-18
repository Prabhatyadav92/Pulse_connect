import { sendWelcomeEmail } from "../EMAILS/emailHandlers.js";
import { generateToken } from '../../lib/utils.js';
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
// import "dotenv/config";

import { ENV } from "../../lib/env.js";



export const signup = async (req,res)=> {

    const { fullName, email, password } = req.body;

    try{

        if(!fullName || !email || !password){
            return res.status(400).json({message:"all fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message:"password should be 6 characters"});
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({message:"invalid email format"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if(newUser){

            await newUser.save();

            generateToken(newUser._id,res);

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            });

            try {
                await sendWelcomeEmail(newUser.email, newUser.fullName, ENV.CLIENT_URL);

            }catch (err) {
                console.error("Error sending welcome email:", err);
            }

        }else{
            res.status(400).json({message:"failed to create user"});
        }

    }catch(err){

        console.log("error in signup controller:",err);
        res.status(500).json({message:"internal server error"});

    }
};

export const login = async (req,res)=> {
    const { email, password } = req.body;
    

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"invalid credentials"});

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"invalid credentials"});

        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic

        });
        
        }
    
        
        catch(err){
            console.log("error in login controller:",err);
            res.status(500).json({message:"internal server error"});

    }};


    export const logout = (_,res)=> {
        res.Cookie('JWT',"","maxAge:0")

        
        res.status(200).json({message:"logged out successfully"});
    }

// const express=require('express');
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const app=express();
const PORT=process.env.PORT || 3000;


app.get('/api/auth/signup',(req,res)=> {
    res.json({message: 'Signup endpoint'});
});

app.get('/api/auth/login',(req,res)=> {
    res.json({message: 'Login endpoint'});
});

app.get('/api/auth/logout',(req,res)=> {
    res.json({message: 'Logout endpoint'});
});

app.listen (PORT,()=> console.log("Server is running on port :"+PORT));

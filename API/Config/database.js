import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// mongodb connection
const connectDB = ()=> {mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase')
.then(()=>console.log('Connected to Monogodb'))
.catch(err => console.log(err))}

export default connectDB;
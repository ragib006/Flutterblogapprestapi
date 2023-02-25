
const express = require('express');
const app = express();

const dotenv = require('dotenv');

const connectDB = require('./config/db.js');

const authRoutes = require('./routes/authRoutes');

dotenv.config();

connectDB();


app.use(express.json());


app.use('/api/user',authRoutes);

//app.get('/',(req,res)=>{

  //res.send("Hello rifat");


//})



const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{


console.log(`Server is Running On Port ${process.env.PORT}`)


})
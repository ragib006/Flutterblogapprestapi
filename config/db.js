const mongoose = require("mongoose")


const connectDB = async()=>{

  try{

  	const conn = await mongoose.connect(process.env.MONGO_URI,{

  	//	      useUnifiedTopology:true,
              useNewUrlParser:true
          
  	})

  //	const conn = await mongoose.connect(process.env.MONGO_URI);

  	console.log('Mongoodb Connect SuccessFully');



  }catch(error){

     
     console.log(error)


  }



}

module.exports = connectDB;
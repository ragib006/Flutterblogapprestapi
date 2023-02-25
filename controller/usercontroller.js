const asyncHandler = require('express-async-handler');

const User = require('../models/usermodel.js');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


//const generateToken = require('../config/generateToken.js')



const Registeruser = asyncHandler(async(req,res)=>{
          

      try{

        //  const getalluser = await User.find();

        //  res.status(200).json(getalluser)

       // res.status(200).json({message:"hello"});


	const {username,email,password} = req.body;

	const userExist = await User.findOne({email});

	if(userExist){

       res.status(403).json({message:'User Already Exist'});

	 }else{


	 	  const myusername = await User.findOne({username});

	 	  if(myusername){

             res.status(403).json({message:'This Username Already Exist'});

	 	  }else{



	 	  	                   const salt = bcrypt.genSaltSync(10);
           const hash = bcrypt.hashSync(req.body.password, salt);

            const newUser = new User({

                        username:username,
                        email:email,
                        password:hash
                       // isverified:false

                })

             const user = await newUser.save();

                     if(user){

                     	res.status(200).json("Ok");

             	          //  res.json({

                          //   _id:user._id,
                         //    username:user.username,
                          //   email:user.email,
                            // isverified:user.isverified
                            // token:generateToken(user._id)

                         // })

               }else{

                   res.status(403).json({message:'User Not Create'});


               }






	 	  }




         }













      }catch(error){

         res.status(404).json(error)

      }

})


//Updateuser


const Updateuser = asyncHandler(async(req,res)=>{
          

      try{

          const updateUser = await User.findOneAndUpdate(req.params.username, {$set:{password:req.body.password}},{new:true});
                              //string diya korle findOneAndUpdate
                              //id diya korle findByIdAndUpdate
          if(updateUser){


                res.status(200).json({
            message:"Profile update Successfully",
          //  username:updateUser.username

          })




          }else{


              res.status(200).json({message:"error"});



          }
      

      }catch(error){

         res.status(404).json(error)

      }

})


//Deleteuser



const Deleteuser = asyncHandler(async(req,res)=>{
          


      try{

            const deleteuser = await User.findOneAndDelete({username:req.params.username});

            if(deleteuser){

              
              res.status(200).json({message:"User delete Successfully"})


            }else{

         
              res.status(400).json({message:"Error"})


            }



  //const deletedUser =  await User.findOne({username:req.params.username});




      }catch(error){

         res.status(404).json(error)

      }

})


//




const Alluser = asyncHandler(async(req,res)=>{
          
   try{

          const alluser = await User.find();

          res.status(200).json(alluser)


      }catch(error){

         res.status(404).json(error)

      }



})


//Userprofile



const Userprofile = asyncHandler(async(req,res)=>{
          
   try{

          const user = await User.findOne({username:req.params.username},'-password');

          if(user){

            res.status(200).json({data:user});

          }else{

           res.status(200).json({message:"user not find"})


          }

         


      }catch(error){

         res.status(404).json(error)

      }



})



//username check   Usercheck


const Usercheck = asyncHandler(async(req,res)=>{
          
   try{

          const user = await User.findOne({username:req.params.username},'-password');

          if(user){

            res.status(200).json({Status:true});

          }else{

           res.status(200).json({Status:false})


          }

      }catch(error){

         res.status(404).json(error)

      }

})















//login 



const Userlogin = asyncHandler(async(req,res)=>{
          
   try{


            const {email,password} = req.body
            const Findemail = await User.findOne({email})

            if(!Findemail){

               res.status(200).json('User Does Not Exist')

            }else{

                 const comparepassword = await bcrypt.compare(req.body.password, Findemail.password)

                  if(comparepassword){

                     // const secretkey = "helloragib";

                      const token = jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:"24h"})

                     
                     res.status(200).json({

                        token:token,
                        message:"success"

                      })
                      

                  }else{


                   res.status(200).json('User Does Not Exist')


                  }





            }

         


      }catch(error){

         res.status(404).json(error)

      }



})







module.exports = {Registeruser,Updateuser,Deleteuser,Alluser,Userprofile,Userlogin,Usercheck}
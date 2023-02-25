

const express = require("express");

const router = express.Router();

const {Registeruser,Updateuser,Deleteuser,Alluser,Userprofile,Userlogin,Usercheck} = require('../controller/usercontroller.js');


const {protect} = require('../middleware/middleware.js');



//router.get("/ragib",(req,res)=>{


   //res.send("hello Ragib");
   


//})


  //localhost:5000/api/user/register
  router.post('/register',Registeruser);
  //localhost:5000/api/user/updateuser/:Ragib
  router.put('/updateuser/:username',protect,Updateuser)

    //localhost:5000/api/user/deleteuser/Ragib
  router.delete('/deleteuser/:username',protect,Deleteuser)

  // //localhost:5000/api/user/alluser
  router.get('/alluser',protect,Alluser)
  //userprofile
//localhost:5000/api/user/userprofile/Ragib
  router.get('/userprofile/:username',protect,Userprofile)
  //Usercheck
//localhost:5000/api/user/checkuser/ragib
  router.get('/checkuser/:username',Usercheck)


//Userlogin
//localhost:5000/api/user/login
  router.post('/login',Userlogin)


module.exports = router
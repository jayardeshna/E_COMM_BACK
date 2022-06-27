const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const express = require('express');
const { body } = require('express-validator');
const res = require('express/lib/response');
const router = express.Router();

const connectDb = require('../DB/conn');
const User = require('../models/userSchema')



router.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password, cpassword } = req.body;

    if (!firstname || !lastname || !username || !email || !password || !cpassword) {
        return res.status(422).json({ error: "plz filled the field" })
    }

    try {

        const EmailExist = await User.findOne({ email: email  });
        const userExist = await User.findOne({ username: username  });
      

        if (EmailExist) {
            return res.status(422).json({error: "THIS EMAIL IS ALREADY EXIST PLEASE TRY ANOTHER ONE" });
        }
        if ( userExist) {
            return res.status(422).json({error: "THIS USER IS ALREADY EXIST PLEASE TRY ANOTHER ONE" });
        }
        
        if (password != cpassword) {
            return res.status(400).json({ error: "Password are not matching" });
        }
        else {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword
            })

            await user.save();

            res.status(201).json({ message: "user register successfully" });
            
        }

    } catch (error) {
        console.log("Registeration failed");
    }

});

// login route

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

  

        if (!email || !password) {
            return res.status(400).json({ error: "PLEASE FILL THE DATA" });
        }

        const userLogin = await User.findOne({ email: email });
        
         const token= await userLogin.generateAuthToken();
       
        if (userLogin) {

            const token= jwt.sign({

                email : req.body.email,
                password : req.body.password,

            }, process.env.SECRET_KEY)

            const isMatch = await bcrypt.compare(password, userLogin.password)
            

            if (!isMatch) {

                res.status(400).json({ error: "invalid password" });
            }
            else {
                console.log(token)
                res.json({ message: "User signin successfull", userLogin: token });
            }
        }
        else {
            res.status(400).json({ error: "invalid email or password" });
        }

    } catch (error) {
        console.log(error);
    }
})





module.exports = router;
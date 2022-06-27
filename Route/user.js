const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const  {verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin} = require('./verifyToken');
const { query } = require('express');

// update user data



router.patch("/updateuser/:id", verifyTokenAndAuthorization , async(req, res)=>{
    try {
        const id = req.params.id;
        const updateuser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.send(updateuser);


    } catch (error) {
        res.status(422).send("error");
    }
})



// Delete user

router.delete("/deleteuser/:id", verifyTokenAndAuthorization ,async (req, res) => {
    try {
        const { id } = req.params;

        const deleteuser = await User.findByIdAndDelete({ _id: id });

        console.log(deleteuser);
        res.status(201).json(deleteuser);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get user

router.get("/getuser/:id", verifyTokenAndAdmin ,async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById({ _id: id });

        
        res.status(201).json(user);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get all user

//user endpoint

router.get("/getData", verifyTokenAndAdmin, async (req, res) => {
    const query= req.query.new;
    try {
        const userData =query
        ? await User.find().sort({_id: -1}).limit(5)
        : await User.find();
       // res.send(req.rootUser);
        res.status(201).json(userData)
       // console.log(userData);
    } catch (error) {
        console.log("something went wrong");
    }
})

//get user state

router.get("/stats", verifyTokenAndAdmin, async(req, res)=>{
    const date = new Date();
    const lastyear = new Date(date.FullYear(date.getFullYear()-1));

    try {
        const data = await User.aggregate([
          { $match: { createdAt: { $gte: lastYear } } },
          {
            $project: {
              month: { $month: "$createdAt" },
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: 1 },
            },
          },
        ]);
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }

})

module.exports = router;
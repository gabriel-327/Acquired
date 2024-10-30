import mongoose from "mongoose";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    const email = req.body.email;
    
    try {
        const findUser = await User.findOne({ email });
        
        if (!findUser) {
            const newUser = await User.create(req.body);
            res.status(201).json({ success: true, data: newUser });
        } else {
            res.status(400).json({
                msg: "User already exists",
                success: false,
            });
        }
    } catch (error) {
        console.error("Error in user registration:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

//will display email and pass in terminal: console.log(email, password);

export const loginUser= async(req,res)=>{
    const{email, password} = req.body;
    //check if user exists
    const findUser= await User.findOne({email});
    if(findUser && await findUser.isPasswordMatch(password)){
        res.json(findUser);
    }
    else{
        //console.error("Invalid Credentials", error.message);
        res.status(500).json({sucess: false, message: "Error in User Login" });
    }
};


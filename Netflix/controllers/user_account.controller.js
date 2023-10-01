import user_accountModel from "../models/user_account.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
    try{

        const {email, password} = req.body;
        const saltRounds = 10;

        const hashed_pass = bcrypt.hashSync(password, saltRounds);

        const usr_acc_data = new user_accountModel({
            email : email,
            password : hashed_pass
        })

        const save_usr_acc = usr_acc_data.save();

        if(usr_acc_data){
            res.status(201).json({
                message: "User signed up successfully"
            })
        }
        else{
            res.status(400).json({
                message:'Something went wrong!'
            })
        }

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
     }   
}

export const login = async (req, res) => {
  try{
    const {email, password} = req.body;
    const usr_acc_ID = req.params.usr_acc_ID;

    const user_acc_data = await user_accountModel.findOne({_id : usr_acc_ID})
    const curr_pass = user_acc_data.password

    const check_pass = bcrypt.compareSync(password, curr_pass);

    if(check_pass == true && email == user_acc_data.email){
        const token = jwt.sign({_id : user_acc_data._id, email : user_acc_data.email}, "test", {expiresIn : "2h"})
        console.log(token)
        return res.status(200).json({
            data : user_acc_data,
            token : token,
            message: "User logged in successfully"
        })
    }
    else{
        return  res.status(400).json({
            message:'Invalid Credentials'
        })
    }
  }catch (error) {
    res.status(500).json({
        message:error.message
    })
 }
}
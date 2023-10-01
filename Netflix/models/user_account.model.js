import mongoose from "mongoose";

const Schema = mongoose.Schema

const usr_acc = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
});

export default mongoose.model("user_account", usr_acc);
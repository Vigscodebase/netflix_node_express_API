import mongoose from "mongoose";

const Schema = mongoose.Schema;

const castschema = new Schema ({

    name : {
        type : String,
        required : true
    },
    about : {
        type : String,
        required : true
    },
    cast_img : {
        type:String,
        default:'default.png'
    },
    created_at : {
        type : Date,
        default : Date.now
    }

})

export default mongoose.model("cast", castschema);
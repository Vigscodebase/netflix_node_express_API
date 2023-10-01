import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subcat = new Schema ({

    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    subcat_img : {
        type:String,
        default:'default.png'
    },
    updated_at : {
        type : Date,
        default : Date.now
    }
})

export default mongoose.model("sub_category", subcat);
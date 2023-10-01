import mongoose from "mongoose";

const Schema = mongoose.Schema;

const catSchema = new Schema ({

    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    updated_at : {
        type : Date,
        default : Date.now
    }

});

export default mongoose.model("category", catSchema);
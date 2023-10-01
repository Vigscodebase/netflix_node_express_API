import mongoose from "mongoose";
import catModel from "./category.model"
import subcatModel from "./subcategory.model"
import castModel from "./cast.model"

const Schema = mongoose.Schema;

const movie_schema = new Schema ({
    cat_id : {
        type : Schema.Types.ObjectId,
        ref : catModel
    },
    sub_cat_id : {
        type : Schema.Types.ObjectId,
        ref : subcatModel
    },
    name : {
        type : String,
        required : true
    },
    movie_img : {
        type : String,
        default:'default.png'
    },
    description : {
        type : String,
        required : true
    },
    releaseDate : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    },
    cast_id : [ {
        type : Schema.Types.ObjectId,
        ref : castModel
    } ],
    created_at : {
        type : Date,
        default : Date.now
    }

})

export default mongoose.model("movie", movie_schema);
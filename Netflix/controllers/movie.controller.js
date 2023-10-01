import movieModel from "../models/movie.model";
import { movie_upload } from "../controllers/file_upload.controller"
import fs from "fs"
import path from "path";

export const addMovie = async (req, res) => {

    try {

        if(req.file){

          const upload_dir = "../public/images/movie_images";
          const corr_path = path.join(__dirname, upload_dir);
          const movie_upload_img = movie_upload.single('movie_img');
          let cast = [];

          const {cat_id, sub_cat_id, name, description, releaseDate, duration, rating, cast_array} = req.body;
          const movie_img = req.file.filename;

          if(cast_array.length > 0){
              for(let i = 0; i < cast_array.length; i ++){
              cast.push(cast_array[i])
            }
          }

          if(!fs.existsSync(upload_dir)){
            fs.mkdirSync(corr_path, {recursive : true});
          }

          movie_upload_img(req,res, async function(err){

            const movie_data = new movieModel({
                cat_id : cat_id,
                sub_cat_id : sub_cat_id,
                name : name,
                movie_img : movie_img,
                description : description,
                releaseDate : releaseDate,
                duration : duration,
                rating : rating,
                cast_id : cast,
            })

            const save_movie = movie_data.save()

            if(movie_data){
                res.status(201).json({
                    message: "Movie added successfully"
                })
             }
             else{
                res.status(400).json({
                    message:'Something went wrong!'
                })
             }
          })

        }
        else {

            const {cat_id, sub_cat_id, name, description, releaseDate, duration, rating, cast_array} = req.body;
            let cast = [];

            if(cast_array.length > 0){
                for(let i = 0; i < cast_array.length; i ++){
                cast.push(cast_array[i])
              }
            }
            
            const movie_data = new movieModel({
                cat_id : cat_id,
                sub_cat_id : sub_cat_id,
                name : name,
                description : description,
                releaseDate : releaseDate,
                duration : duration,
                rating : rating,
                cast_id : cast,
            })

            const save_movie = movie_data.save()
            
            if(movie_data){
                res.status(201).json({
                    message: "Movie added successfully"
                })
             }
            else{
                res.status(400).json({
                    message:'Something went wrong!'
                })
             }
        }

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
     }

}

export const getAllMovie = async (req, res) => {
  try{
    const {q} = req.query;
    let list_movie = [];

    if(q != undefined){
        list_movie = await movieModel.find({
            $or: [ { name : { $regex: `.*${q}.*`, $options: "i" } }, 
                   { description : { $regex: `.*${q}.*`, $options: "i" } },
                 ],
        }).populate({path : "cat_id", model : "category"}).populate({path : "sub_cat_id", model : "sub_category"}).populate({path : "cast_id", model : "cast"})

    }
    else{
        list_movie = await movieModel.find({}).populate({path : "cat_id", model : "category"}).populate({path : "sub_cat_id", model : "sub_category"}).populate({path : "cast_id", model : "cast"})
    }

    if (list_movie.length == 0) {
        return  res.status(400).json({
          message: "Movies doesn't exist on database please do add movies."
        })
     }

     if(list_movie){
        return res.status(200).json({
             data : list_movie,
             message: "All movies fetched successfully"
         })
      }
    else{
        return  res.status(400).json({
             message:'Something went wrong!'
         })
      }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
     }
}

export const getSingleMovie = async (req, res) => {

    try {

        const movie_ID = req.params.movie_ID;
        const sing_movie = await movieModel.findOne({_id : movie_ID}).populate({path : "cat_id", model : "category"}).populate({path : "sub_cat_id", model : "sub_category"}).populate({path : "cast_id", model : "cast"});

        if (sing_movie == null) {
             return res.status(400).json({
             message: "Movies doesn't exist on database please do add movie."
             })
          }

        if(sing_movie){
            res.status(200).json({
                data : sing_movie,
                message: "All movies fetched successfully"
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

export const updateMovie = async (req, res) => {

    try{

        if(req.file){

          const movie_ID = req.params.movie_ID; 
          const sing_movie = await movieModel.findOne({_id : movie_ID})
          const old_movie_img = sing_movie.movie_img;
          const old_cast = sing_movie.cast_id
          const upload_dir = "../public/images/movie_images";
          const corr_path = path.join(__dirname, upload_dir);
          const movie_upload_img = movie_upload.single('movie_img');
          let cast = [];

          if(old_cast.length > 0){
            for(let j = 0; j < old_cast.length; j ++){
                cast.push(old_cast[j])
            }
         }

          if(old_movie_img != "default.png"){
            if(fs.existsSync(corr_path)){
            fs.unlink("./public/images/movie_images/" + old_movie_img, (err => {
              if (err) return res.status(400).json({message:err});
              else {
                console.log("One file deleted");
              }
            }));
          }
        }

        movie_upload_img(req,res, async function(err){

            const {cat_id, sub_cat_id, name, description, releaseDate, duration, rating, cast_array} = req.body;
            const movie_img = req.file.filename;
  
            if(cast_array != null){
            if(cast_array.length > 0){
                for(let i = 0; i < cast_array.length; i ++){
                cast.push(cast_array[i])
              }
            }
        }

            const update_movie = await movieModel.updateOne(
                {_id : movie_ID},
                {$set : {
                    cat_id : cat_id,
                    sub_cat_id : sub_cat_id,
                    name : name,
                    movie_img : movie_img,
                    description : description,
                    releaseDate : releaseDate,
                    duration : duration,
                    rating : rating,
                    cast_id : cast,
                 }}
            );

            if(update_movie.acknowledged){
                res.status(201).json({
                    message: "Movie updated successfully"
                })
             }
             else{
                res.status(400).json({
                    message:'Something went wrong!'
                })
             }
        })

        }
        else{

            const {cat_id, sub_cat_id, name, description, releaseDate, duration, rating, cast_array} = req.body;
            const movie_ID = req.params.movie_ID; 
            const sing_movie = await movieModel.findOne({_id : movie_ID})
            const old_cast = sing_movie.cast_id
            let cast = []

            if(old_cast.length > 0){
                for(let j = 0; j < old_cast.length; j ++){
                    cast.push(old_cast[j])
                }
             }

            if(cast_array != null){
            if(cast_array.length > 0){
                for(let i = 0; i < cast_array.length; i ++){
                cast.push(cast_array[i])
              }
            }
        }

            const update_movie = await movieModel.updateOne(
                {_id : movie_ID},
                {$set : {
                    cat_id : cat_id,
                    sub_cat_id : sub_cat_id,
                    name : name,
                    description : description,
                    releaseDate : releaseDate,
                    duration : duration,
                    rating : rating,
                    cast_id : cast,
                 }}
            );

            if(update_movie.acknowledged){
                res.status(201).json({
                    message: "Movie updated successfully"
                })
             }
             else{
                res.status(400).json({
                    message:'Something went wrong!'
                })
             }
        }

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
     }
}

export const deltcast = async (req, res) => {

    try {

        let pull_cast;
        const movie_ID = req.params.movie_ID;
        const cast_ID = req.params.cast_ID;
        const sing_movie = await movieModel.findOne({_id : movie_ID})
        const old_cast = sing_movie.cast_id

        if(old_cast.length > 0){
            for(let j = 0; j < old_cast.length; j ++){
                const myObjectIdString = old_cast[j].toString()
                if(myObjectIdString == cast_ID){
                  pull_cast = await movieModel.updateOne({_id : movie_ID}, {$pull: {cast_id : cast_ID}})
                }
            }
         }

         if(pull_cast.acknowledged){
            return res.status(201).json({
               message: "One cast deleted successfully"
           })
          }
         else{
            return res.status(400).json({
               message:'Something went wrong!'
           })
          }

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
     }
}

export const deletMovie = async (req, res) => {

    try {

        const movie_ID = req.params.movie_ID; 
        const sing_movie = await movieModel.findOne({_id : movie_ID})
        const old_movie_img = sing_movie.movie_img;
        const upload_dir = "../public/images/movie_images";
        const corr_path = path.join(__dirname, upload_dir);

        if(old_movie_img != "default.png"){
            if(fs.existsSync(corr_path)){
            fs.unlink("./public/images/movie_images/" + old_movie_img, (err => {
              if (err) return res.status(400).json({message:err});
              else {
                console.log("One file deleted");
              }
            }));
          }
        }

        const delete_movie = await movieModel.deleteOne({_id : movie_ID},);

        if(delete_movie.acknowledged){
            res.status(201).json({
                message: "Movie deleted successfully"
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
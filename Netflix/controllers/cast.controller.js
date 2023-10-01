import castModel from "../models/cast.model";
import { cast_upload } from "../controllers/file_upload.controller"
import fs from "fs"
import path from "path";

export const addcast = async (req, res) => {

    try{

        if(req.file){

         const upload_dir = "../public/images/cast_images";
         const corr_path = path.join(__dirname, upload_dir);
         const cast_upload_img = cast_upload.single('cast_img');

         const {name, about} = req.body;
         const cast_img = req.file.filename;

         if(!fs.existsSync(upload_dir)){
            fs.mkdirSync(corr_path, {recursive : true});
          }

          cast_upload_img(req,res, async function(err) {
           
            const cast_data = new castModel ({
                name : name,
                about : about,
                cast_img : cast_img
            })

            const save_cast = cast_data.save()

            if(cast_data){
                res.status(201).json({
                    message: "Cast added successfully"
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

            const {name, about} = req.body;

            const cast_data = new castModel ({
                name : name,
                about : about,
            })

            const save_cast = cast_data.save()

            if(cast_data){
                res.status(201).json({
                    message: "Cast added successfully"
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

export const getAllCast = async (req, res) => {

    try{

        const list_cats = await castModel.find();

        if (list_cats.length == 0) {
            res.status(400).json({
            message: "Casts doesn't exist on database please do add casts."
          })
       }
       else if(list_cats){
        res.status(200).json({
            data : list_cats,
            message: "All casts fetched successfully"
        })
     }

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
     }

}

export const getCast = async (req, res) => {

    try {

        const cast_ID = req.params.cast_ID;
        const sing_cast = await castModel.findOne({_id : cast_ID});

        if (sing_cast == null) {
            return res.status(400).json({
             message: "Casts doesn't exist on database please do add cast."
             })
          }

        if(sing_cast){
            res.status(200).json({
                data : sing_cast,
                message: "All casts fetched successfully"
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

export const updateCaste = async (req, res) => { 

    try{

        if(req.file){

            const cast_ID = req.params.cast_ID;
            const sing_cast = await castModel.findOne({_id : cast_ID});
            const old_cast_img = sing_cast.cast_img; 
            const upload_dir = "../public/images/cast_images";
            const corr_path = path.join(__dirname, upload_dir + "/" + old_cast_img);
            const cast_upload_img = cast_upload.single('cast_img');

            if(old_cast_img != "default.png"){
                if(fs.existsSync(corr_path)){
                fs.unlink("./public/images/cast_images/" + old_cast_img, (err => {
                  if (err) return res.status(400).json({message:err});
                  else {
                    console.log("One file deleted");
                  }
                }));
              }
            }

            cast_upload_img(req,res, async function(err){

                const {name, about} = req.body;
                const cast_img = req.file.filename;

                const update_cast = await castModel.updateOne(
                    {_id : cast_ID},
                    {$set : {
                        name : name,
                        about : about,
                        cast_img : cast_img
                    }}
                )

                if(update_cast.acknowledged){
                    res.status(201).json({
                        message: "Cast updated successfully"
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

            const cast_ID = req.params.cast_ID;
            const {name, about} = req.body;

            const update_cast = await castModel.updateOne(
                {_id : cast_ID},
                {$set : {
                    name : name,
                    about : about,
                }}
            )

            if(update_cast.acknowledged){
                res.status(201).json({
                    message: "Cast updated successfully"
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

export const deletCast = async (req, res) => {

    try{

            const cast_ID = req.params.cast_ID;
            const sing_cast = await castModel.findOne({_id : cast_ID});
            const old_cast_img = sing_cast.cast_img; 
            const upload_dir = "../public/images/cast_images";
            const corr_path = path.join(__dirname, upload_dir + "/" + old_cast_img);

            if(old_cast_img != "default.png"){
                if(fs.existsSync(corr_path)){
                fs.unlink("./public/images/cast_images/" + old_cast_img, (err => {
                  if (err) return res.status(400).json({message:err});
                  else {
                    console.log("One file deleted");
                  }
                }));
              }
            }

            const delete_cast = await castModel.deleteOne({_id : cast_ID});

            if(delete_cast.acknowledged){
                res.status(201).json({
                    message: "Cast deleted successfully"
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
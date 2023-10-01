import subcatModel from "../models/subcategory.model";
import { subcat_upload } from "../controllers/file_upload.controller"
import fs from "fs"
import path from "path";

export const addSubcat = (req, res) => {
    try{

        if(req.file){

            const upload_dir = "../public/images/subcategory_images";
            const corr_path = path.join(__dirname, upload_dir);
            const subcat_img_upld = subcat_upload.single("subcat_img");

            const {name, description} = req.body;
            const subcat_img = req.file.filename;

            if(!fs.existsSync(upload_dir)){
                fs.mkdirSync(corr_path, {recursive : true});
              }

            subcat_img_upld(req,res, async function(err){
                
                const subcat_data = new subcatModel ({
                    name : name,
                    description : description,
                    subcat_img : subcat_img
                })

                const save_subcat = subcat_data.save();

                if(subcat_data){
                    res.status(201).json({
                        message: "Subcategory added successfully"
                    })
                } else {
                    res.status(400).json({
                        message:'Something went wrong!'
                    })
                }
            })
        }
        else {
            const {name, description} = req.body;

            const subcat_data = new subcatModel ({
                name : name,
                description : description
            })

            const save_subcat = subcat_data.save();

            if(subcat_data){
                res.status(201).json({
                    message: "Subcategory added successfully"
                })
            } else {
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

export const allsubcat = async (req, res) => {

    try{

        const list_subcat = await subcatModel.find();

        if (list_subcat.length == 0) {
            res.status(400).json({
            message: "Subcategory doesn't exist on database please do add subcategory."
          })
       }
       else if(list_subcat){
        res.status(200).json({
            data : list_subcat,
            message: "All subcategory fetched successfully"
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

export const singlesubcat = async (req, res) => {

    try {

        const subcat_ID = req.params.subcat_ID
        const sing_subcat = await subcatModel.findOne({_id : subcat_ID});

        if (sing_subcat == null) {
            return res.status(400).json({
             message: "Subcategory doesn't exist on database please do add subcategory."
             })
          }

       if(sing_subcat){
            res.status(200).json({
                data : sing_subcat,
                message: "All subcategory fetched successfully"
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

export const updateSubCat = async (req, res) => {

    try {

        if(req.file){

           const subcat_ID = req.params.subcat_ID;
           const sing_subcat = await subcatModel.findOne({_id : subcat_ID});
           const subcat_old_img = sing_subcat.subcat_img;
           const upload_dir = "../public/images/subcategory_images";
           const corr_path = path.join(__dirname, upload_dir);
           const subcat_img_upld = subcat_upload.single("subcat_img");

           if(subcat_old_img != "default.png"){
            if(fs.existsSync(corr_path)){
                fs.unlink("./public/images/subcategory_images/" + subcat_old_img, (err => {
                    if (err) return res.status(400).json({message:err});
                    else {
                      console.log("One file deleted");
                    }
                  }));
            }
           }

           subcat_img_upld(req,res, async function(err){
             
            const {name, description} = req.body;
            const subcat_img = req.file.filename;

            const update_subcat = await subcatModel.updateOne(
               {_id : subcat_ID},
               {$set : {
                  name : name,
                  description : description,
                  subcat_img : subcat_img
                    }}
            );   

            if(update_subcat.acknowledged){
                res.status(201).json({
                    message: "Subcategory updated successfully"
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
            
            const subcat_ID = req.params.subcat_ID;
            const {name, description} = req.body;

            const update_subcat = await subcatModel.updateOne(
                {_id : subcat_ID},
                {$set : {
                   name : name,
                   description : description,
                     }}
             );

             if(update_subcat.acknowledged){
                res.status(201).json({
                    message: "Subcategory updated successfully"
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

export const deletsubcat = async (req, res) => {

    try{

        const subcat_ID = req.params.subcat_ID;
        const sing_subcat = await subcatModel.findOne({_id : subcat_ID});
        const subcat_old_img = sing_subcat.subcat_img;
        const upload_dir = "../public/images/subcategory_images";
        const corr_path = path.join(__dirname, upload_dir);
        const subcat_img_upld = subcat_upload.single("subcat_img");

        if(subcat_old_img != "default.png"){
         if(fs.existsSync(corr_path)){
             fs.unlink("./public/images/subcategory_images/" + subcat_old_img, (err => {
                 if (err) return res.status(400).json({message:err});
                 else {
                   console.log("One file deleted");
                 }
               }));
         }
        }

        const delete_subcat = await subcatModel.deleteOne({_id : subcat_ID});

        if(delete_subcat.acknowledged){
            res.status(201).json({
                message: "Subcategory deleted successfully"
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
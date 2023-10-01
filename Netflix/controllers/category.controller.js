import categoryModel from "../models/category.model";

export const addCat = (req, res) => {

    const {name, description} = req.body;

    try {

     const catData = new categoryModel ({
        name : name,
        description : description
     })
     const saveCatData = catData.save();

     if(catData){
        res.status(200).json({
            message : "Inserted category successfully"
        })
     }
     else {
        res.status(400).json({
            message : "Insertion Failed"
        })
     }
        
    }  catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}


export const getCat = async (req, res) => {

    try {
     const fetchedCat = await categoryModel.find();

     if(fetchedCat){
        return res.status(200).json({
            data : fetchedCat,
            message: "All categories fetched successfully"
        })
     }
     else if (fetchedCat.length == 0) {
        return  res.status(400).json({
          message: "Categories doesn't exist on database please do add categories."
        })
     }
     else {
        res.status(400).json({
            message : "Fetching Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const getSingleCat = async (req, res) => {   

    try {
     const catID = req.params.catID;
     const fetchedCat = await categoryModel.find({_id : catID});
     if(fetchedCat){
        return res.status(200).json({
            data : fetchedCat,
            message: "Category fetched successfully"
        })
     }
     else if (fetchedCat == null){
            return res.status(400).json({
             message: "Categories doesn't exist on database please do add categories."
             })
     }
     else {
        res.status(400).json({
            message : "Fetching Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const updateCategory = async (req, res) => {

    try {
     const catID = req.params.catID;
     const {name, description} = req.body;
     const fetchedCat = await categoryModel.updateOne(
        {_id : catID},
        {$set: {name : name, description : description}}
        );
     if(fetchedCat.acknowledged){
        res.status(200).json({
            message : "Category successfully updated"
        })
     }
     else {
        res.status(400).json({
            message : "Category update Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export const deleteCategory = async (req, res) => {

    try {
     const catID = req.params.catID;
     const fetchedCat = await categoryModel.deleteOne({_id : catID});
     if(fetchedCat.acknowledged){
        res.status(200).json({
            message : "Category deleted successfully"
        })
     }
     else {
        res.status(400).json({
            message : "Delete Failed"
        })
     }
        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}
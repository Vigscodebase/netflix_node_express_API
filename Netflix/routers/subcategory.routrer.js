import express from "express";
import bodyParser from "body-parser";
import { addSubcat, allsubcat, singlesubcat, updateSubCat, deletsubcat } from "../controllers/subcategory.controller"
import { subcat_upload } from "../controllers/file_upload.controller"
import util from "util"

const subcatrout = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : true});
var jsonParser = bodyParser.json();
var multer_file = subcat_upload.single('subcat_img');
var multer_middleware = util.promisify(multer_file);

subcatrout.post("/add-subcategory", urlencodedParser, multer_middleware, addSubcat);
subcatrout.get("/get-all-subcategory", allsubcat)
subcatrout.get("/get-single-category/:subcat_ID", singlesubcat)
subcatrout.patch("/update-subcategory/:subcat_ID", urlencodedParser, multer_middleware, updateSubCat)
subcatrout.delete("/delete-subcategory/:subcat_ID", deletsubcat)

//export default subcatrout;
module.exports = {subcatrout, multer_middleware};
import express from "express";
import bodyParser from "body-parser";
import { addcast, getAllCast, getCast, updateCaste, deletCast } from "../controllers/cast.controller"
import { cast_upload } from "../controllers/file_upload.controller"
import util from "util"

const castrout = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : true});
var jsonParser = bodyParser.json();
var multer_file = cast_upload.single('cast_img');
var multer_middleware = util.promisify(multer_file);

castrout.post("/add-cast", urlencodedParser, multer_middleware, addcast)
castrout.get("/all-cast", getAllCast)
castrout.get("/single-cast/:cast_ID", getCast)
castrout.patch("/update-cast/:cast_ID", urlencodedParser, multer_middleware, updateCaste)
castrout.delete("/delete-cast/:cast_ID", deletCast)

//export default castrout;
module.exports = {castrout, multer_middleware};
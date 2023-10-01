import express from "express";
import bodyParser from "body-parser";
import { addMovie, getAllMovie, getSingleMovie, updateMovie, deltcast, deletMovie } from "../controllers/movie.controller"
import { movie_upload } from "../controllers/file_upload.controller"
import auth from "../middleware/auth.middleware"
import util from "util"

const movierout = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended : true});
var jsonParser = bodyParser.json();
var multer_file = movie_upload.single('movie_img');
var multer_middleware = util.promisify(multer_file);

movierout.post("/add-movie", auth,  urlencodedParser, multer_middleware, addMovie)
movierout.get("/list-all-movie", getAllMovie)
movierout.get("/get-single-movie/:movie_ID", getSingleMovie)
movierout.patch("/update-movie/:movie_ID", auth, urlencodedParser, multer_middleware, updateMovie)
movierout.post("/delete-cast/:movie_ID/:cast_ID", deltcast)
movierout.delete("/delete-movie/:movie_ID", auth, deletMovie)

//export default movierout;
module.exports = {movierout, multer_middleware};
import { addCat, getCat, getSingleCat, updateCategory, deleteCategory } from "../controllers/category.controller";
import express from "express"
import bodyParser from "body-parser"

const jsonParser = bodyParser.json()
const catrout = express.Router();

catrout.post("/add-category", jsonParser, addCat);
catrout.get("/all-category", getCat);
catrout.get("/get-single-category/:catID", getSingleCat);
catrout.patch("/update-category/:catID", jsonParser, updateCategory);
catrout.delete("/delete-category/:catID", deleteCategory)

export default catrout;
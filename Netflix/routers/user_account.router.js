import express from "express";
import bodyParser from "body-parser";
import {signup, login} from "../controllers/user_account.controller"

const usr_acc_rout = express.Router();

var jsonParser = bodyParser.json();

usr_acc_rout.post("/add-user-account", jsonParser, signup)
usr_acc_rout.post("/check-user-account/:usr_acc_ID", jsonParser, login)

export default usr_acc_rout;
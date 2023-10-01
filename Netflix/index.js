import express from "express";
import catrout from "./routers/catergory.router"
import { subcatrout } from "./routers/subcategory.routrer"
import { castrout } from "./routers/cast.router"
import { movierout } from "./routers/movie.router"
import usr_acc_rout from "./routers/user_account.router"
import mongoose from "mongoose";
import * as dotenv from "dotenv"

const app = express();
const dotenv_config = dotenv.config();
const port = process.env.DEV_PORT
const db_url = process.env.URL;

app.use(express.static(__dirname))

app.listen(port, (req, res) => {
    console.log(`The server is runing at ${port} port.`)
});

mongoose.connect(db_url).then(() => {
    console.log("Netflix database connected");
})

app.use("/category", catrout);
app.use("/subcategory", subcatrout);
app.use("/cast", castrout);
app.use("/movie", movierout);
app.use("/user", usr_acc_rout);

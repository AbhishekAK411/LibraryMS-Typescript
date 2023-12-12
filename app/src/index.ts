import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/mainRoutes";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use("/lib", router);

mongoose.connect(process.env.mongo)
.then(() => console.log("DB Connection Established."))
.catch((err) => console.log("DB Error => ", err));

const port: string = process.env.port || "6200";

app.listen(port, () => console.log(`Listening on port --> ${port}`));
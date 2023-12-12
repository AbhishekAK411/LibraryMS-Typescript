import express from "express";
import memberRouter from "./memberRoutes";
import bookRouter from "./bookRoutes";
import { CronJob } from "cron";
import { generateToken } from "../Controllers/token.controller";

const router = express.Router();

// let job = new CronJob("", () => {

// });

router.use("/members", memberRouter);
router.use("/books", bookRouter);
router.post("/token", generateToken);

export default router;
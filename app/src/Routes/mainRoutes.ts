import express from "express";
import memberRouter from "../Routes/memberRoutes"
import bookRouter from "../Routes/bookRoutes"

const router = express.Router();

router.use("/members", memberRouter);
router.use("/books", bookRouter);

export default router;
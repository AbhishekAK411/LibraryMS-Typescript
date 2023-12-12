import express from "express";
import memberRouter from "./memberRoutes";
import bookRouter from "./bookRoutes";

const router = express.Router();

router.use("/members", memberRouter);
router.use("/books", bookRouter);

export default router;
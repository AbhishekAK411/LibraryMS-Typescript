import { createBook } from "../Controllers/book.controller";
import { checkCreateBook } from "../Middlewares/book.auth";
import express from "express";

const bookRouter = express.Router();

bookRouter.post("/create", checkCreateBook, createBook);

export default bookRouter;
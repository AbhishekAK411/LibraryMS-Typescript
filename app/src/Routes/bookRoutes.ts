import { tokenMiddleware } from "../Middlewares/auth";
import { createBook, deleteBook, getBooks, getSingleBook, updateBook } from "../Controllers/book.controller";
import { validateCreateBook, validateDeleteBook, validateGetBooks, validateGetSingleBook, validateUpdateBook } from "../Middlewares/book.auth";
import express from "express";

const router = express.Router();

//* Book routes (book)
router.get("/", validateGetBooks, getBooks);
router.post("/create", tokenMiddleware, validateCreateBook, createBook);
router.get("/:bookId", tokenMiddleware, validateGetSingleBook, getSingleBook);
router.put("/update/:bookId", tokenMiddleware, validateUpdateBook, updateBook);
router.delete("/cross/:bookId", tokenMiddleware, validateDeleteBook, deleteBook);

export default router;
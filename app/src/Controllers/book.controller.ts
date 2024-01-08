import { TBook } from "../Types/types";
import Book from "../Models/book";
import { Request, Response } from "express";

export const getBooks = async(req: Request, res: Response) => {
    try {
        const findAllBooks = await Book.find({}).exec();
        if(findAllBooks.length > 0){
            return res.status(200).json({status: 200, success: true, books: findAllBooks});
        }else{
            return res.status(400).json({status: 400, success: false, message: "No books found."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const createBook = async(req: Request, res: Response) => {
    try {
        const { title, author, category, isbn, publicationDate, rackNumber }: TBook = req.body;

        const findExistingBook = await Book.findOne({isbn}).exec();

        if(findExistingBook){
            const newBookItem = {
                bookItem: findExistingBook._id,
                isAvailable: true
            };

            findExistingBook.copies.push(newBookItem);
            await findExistingBook.save();
            return res.status(200).json({status: 200, success: true, message: "Book copy added successfully."});
        }else{
            const newBook = new Book({
                title,
                author,
                category,
                isbn,
                publicationDate,
                rackNumber
            });

            await newBook.save();
            return res.status(201).json({status: 201, success: true, message: "Book added successfully."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const getSingleBook = async(req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        let findExistingBook: TBook = await Book.findById(bookId).exec();
        findExistingBook = await Book.populate(findExistingBook, {
            path: 'copies.bookItem',
            select: 'title author category isbn publicationDate rackNumber'
        })

        return res.status(200).json({status: 200, success: true, book: findExistingBook});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const updateBook = async(req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const { title, author, category, isbn, publicationDate, rackNumber }: TBook = req.body;

        const updateBook: TBook = await Book.findByIdAndUpdate(bookId, {
            title,
            author,
            category,
            isbn,
            publicationDate,
            rackNumber,
        }, {
            new: true
        });

        if(updateBook){
            return res.status(200).json({status: 200, success: true, message: "Book updated successfully.", book: updateBook});
        }else{
            return res.status(400).json({status: 400, success: false, message: "Failed to update book. Try again later."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const deleteBook = async(req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const findExistingBook = await Book.findById(bookId).exec();
        if(findExistingBook.copies.length > 0){
            findExistingBook.copies.pop();
            await findExistingBook.save();
            return res.status(200).json({status: 200, success: true, message: "Book copy removed successfully."});
        }else{
            const deleteBook = await Book.findByIdAndDelete(bookId).exec();
            if(deleteBook){
                return res.status(200).json({status: 200, success: true, message: "Book removed successfully."});
            }else{
                return res.status(400).json({status: 400, success: false, message: "Failed to remove book. Try again later."});
            }
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
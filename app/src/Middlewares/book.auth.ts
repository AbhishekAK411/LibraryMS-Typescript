import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import Member from "../Models/member";
import { TBook } from "../Types/types";
import Book from "../Models/book";

export const validateGetBooks = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            try {
                token = req.headers.authorization.split(" ")[1];
                const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
                req.user = await Member.findById(decode._id).select("-password");

                next();
            } catch (error) {
                return res.status(401).json({status: 401, success: false, message: "Not authorized."});
            }
        }else{
            return res.status(400).json({status: 400, success: false, message: "Authentication failed."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateCreateBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, author, category, isbn, publicationDate, rackNumber }: TBook = req.body;
        if(!title) return res.status(404).json({status: 404, success: false, message: "Title is required."});
        if(!author) return res.status(404).json({status: 404, success: false, message: "Author is required."});
        if(!category) return res.status(404).json({status: 404, success: false, message: "Category is required."});
        if(!isbn) return res.status(404).json({status: 404, success: false, message: "ISBN number is required."});
        if(!publicationDate) return res.status(404).json({status: 404, success: false, message: "Publication date is required."});
        if(!rackNumber) return res.status(404).json({status: 404, success: false, message: "Rack number is required."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateGetSingleBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        if(!bookId) return res.status(404).json({status: 404, success: false, message: "Book id is required."});

        const findExistingBook = await Book.findById(bookId).exec();
        if(!findExistingBook) return res.status(404).json({status: 404, success: false, message: "Book not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateUpdateBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        if(!bookId) return res.status(404).json({status: 404, success: false, message: "Book id is required."});

        const findExistingBook = await Book.findById(bookId).exec();
        if(!findExistingBook) return res.status(404).json({status: 404, success: false, message: "Book not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateDeleteBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        if(!bookId) return res.status(404).json({status: 404, success: false, message: "Book id is required."});

        const findExistingBook = await Book.findById(bookId).exec();
        if(!findExistingBook) return res.status(404).json({status: 404, success: false, message: "Book not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
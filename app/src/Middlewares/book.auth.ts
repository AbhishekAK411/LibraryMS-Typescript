import { NextFunction, Request, Response } from "express";

export const checkCreateBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, author, subject, category, publicationDate, rackNumber } = req.body;
        if(!title) return res.status(404).json({status: 404, success: false, message: "Title of the book is required."});
        if(!author) return res.status(404).json({status: 404, success: false, message: "Book author name should be provided."});
        if(!subject) return res.status(404).json({status: 404, success: false, message: "Subject of the book is required."});
        if(!category) return res.status(404).json({status: 404, success: false, message: "Category of the book is required."});
        if(!publicationDate) return res.status(404).json({status: 404, success: false, message: "Publication date should be provided."});
        if(!rackNumber) return res.status(404).json({status: 404, success: false, message: "Internal server error."});

        next();
        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
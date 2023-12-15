import { Request, Response } from "express";
import Book from "../Models/book";
import { uniqueIDGenerator } from "../Utils/uniqueIDGenerator";

export const createBook = async(req: Request, res: Response) => {
    try {
        const {title, author, subject, category, uniqueID, publicationDate, rackNumber} = req.body;

        const findExistingBook = await Book.findOne({uniqueID}).exec();
        if(!findExistingBook){
            const generateUniqueID = uniqueIDGenerator(title);
            const newBook = new Book({
                title,
                author,
                subject,
                category,
                uniqueID: generateUniqueID,
                publicationDate,
                rackNumber
            });

            await newBook.save();
            return res.status(201).json({status: 201, success: true, message: "New book added successfully."});
        }else{
            const copyItem = {
                bookItem: uniqueID,
                isAvailable: true
            };

            findExistingBook.copies.push(copyItem);
            await findExistingBook.save();

            return res.status(200).json({status: 200, success: true, message: "Book added successfully."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
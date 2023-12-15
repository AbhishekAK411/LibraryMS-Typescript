import { ICopies } from "../Types/interfaces";
import mongoose, { Document, Schema } from "mongoose";

enum Category {
    Horror = "Horror",
    Fantasy = "Fantasy",
    Fiction = "Fiction",
    Mystery = "Mystery",
    Romance = "Romance",
    Thriller = "Thriller",
    Arts = "Arts",
    Biography = "Biography",
    Dystopian = "Dystopian",
    History = "History"
}

interface IBook extends Document {
    title: string;
    author: string;
    subject: string;
    category: Category;
    publicationDate: Date;
    uniqueID?: string;
    rackNumber: string;
    copies: ICopies[];
}

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(Category),
        default: null,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    uniqueID: {
        type: String,
        unique: true
    },
    rackNumber: {
        type: Number,
        required: true,
        default: 0
    },
    copies: [
        {
            bookItem: {
                type: String,
                required: true,
                unique: true,
            },
            isAvailable: {
                type: Boolean,
                default: true,
            }
        }
    ]
});

export default mongoose.model<IBook>("Book", bookSchema);
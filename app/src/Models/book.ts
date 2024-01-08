import { Category, ICopies } from "../Types/interfaces";
import mongoose, { Schema } from "mongoose";

interface IBook extends Document {
    title: string;
    author: string;
    category: Category;
    isbn: string;
    publicationDate: Date;
    rackNumber: number;
    copies: ICopies[];
}

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(Category),
        default: null,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        min: 13,
        max: 1024
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    rackNumber: {
        type: Number,
        required: true,
        default: null
    },
    copies: [
        {
            bookItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: true,
            },
            isAvailable: {
                type: Boolean,
                default: true
            }
        }
    ]
});

export default mongoose.model<IBook>("Book", bookSchema);
import mongoose, { Schema, Document } from "mongoose";

interface ICheckOutBooks {
    bookItem: string;
    dueDate: Date;
    fine: number;
}

interface IReservedBooks {
    book: string;
    notificationSent: boolean;
}

interface IMember extends Document {
    name: string;
    menberId: string;
    checkedOutBooks: ICheckOutBooks[];
    reservedBooks: IReservedBooks[];
    maxBooksCheckedOut: number;
    maxDaysBooksCanBeKept: number;
}

const memberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    memberId: {
        type: String,
        required: true,
        unique: true,
    },
    checkedOutBooks: [
        {
            bookItem: {
                type: String,
                required: true,
            },
            dueDate: {
                type: Date,
                required: true
            },
            fine: {
                type: Number,
                default: 0
            },

        }
    ],
    reservedBooks: [
        {
            book: {
                type: String,
                required: true,
            },
            notificationSent: {
                type: Boolean,
                default: false,
            }
        }
    ],
    maxBooksCheckedOut: {
        type: Number,
        default: 5,
        min: 0,
        max: 5
    },
    maxDaysBooksCanBeKept: {
        type: Number,
        default: 10,
        min: 0,
        max: 10
    }
});

export default mongoose.model<IMember>("Member", memberSchema);
import { ICheckedOutBooks, IReservedBooks } from "Types/interfaces";
import mongoose, { Schema } from "mongoose";

enum Role {
    Admin = "Admin",
    Librarian = "Librarian",
    Member = "Member",
}
interface IMember extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    contact: string;
    address: string,
    checkedOutBooks: ICheckedOutBooks[],
    reservedBooks: IReservedBooks[],
    maxBooksCheckedOut: number,
    role: Role;
    join_date: Date;
}

const memberSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please use a valid email address.",
        ]
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        min: 10,
        max: 10
    },
    address: {
        type: String,
        required: true,
    },
    checkedOutBooks: [
        {
            bookItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            },
            dueDate: {
                type: Date,
                required: true,
            },
            fine: {
                type: Number,
                default: 0
            },
            maxDaysBooksCanBeKept: {
                type: Number,
                default: 10,
                min: 0,
                max: 10
            }
        }
    ],
    reservedBooks: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
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
    role: {
        type: String,
        enum: Object.values(Role),
        default: null,
    },
    join_date: {
        type: Date,
        default: Date.now(),
    },
},{
    timestamps: true
});

export default mongoose.model<IMember>("Member", memberSchema);
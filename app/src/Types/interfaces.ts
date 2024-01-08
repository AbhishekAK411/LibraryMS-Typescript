import { Types } from "mongoose";

export enum Category {
    Horror = "Horror",
    Fantasy = "Fantasy",
    Fiction = "Fiction",
    Mystery = "Mystery",
    Romance = "Romance",
    Thriller = "Thriller",
    Arts = "Arts",
    Biography = "Biography",
    Dystopian = "Dystopian",
    History = "History",
    Classic = "Classic"
}

export enum Role {
    Admin = "Admin",
    Librarian = "Librarian",
    Member = "Member",
}
export interface ICheckedOutBooks {
    bookItem: Types.ObjectId;
    dueDate: Date;
    fine: number;
    maxDaysBooksCanBeKept: number;
}

export interface IReservedBooks {
    book: Types.ObjectId;
    notificationSent: boolean;
}

export interface ICopies {
    bookItem: Types.ObjectId;
    isAvailable: boolean;
}
import { Types } from "mongoose";

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
import {Document, Types} from "mongoose";
import { ICheckOutBooks, IReservedBooks } from "./interfaces";

export type TMember = Document & {
    _id: Types.ObjectId;
    name: string;
    memberId: string;
    checkedOutBooks : ICheckOutBooks[];
    reservedBooks: IReservedBooks[];
    maxBooksCheckedOut: number;
    maxDaysBooksCanBeKept: number;
    token: string;
}
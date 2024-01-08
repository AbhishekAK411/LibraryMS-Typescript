import { Types } from "mongoose";
import { Category, ICheckedOutBooks, ICopies, IReservedBooks, Role } from "./interfaces";

export type TMember = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    contact: string;
    address: string;
    checkedOutBooks: ICheckedOutBooks[];
    reservedBooks: IReservedBooks[];
    maxBooksCheckedOut: number;
    role: Role;
    join_date: Date;
}

export type TUserID = {
    id: Types.ObjectId
}

export type TBook = {
    title: string;
    author: string;
    category: Category;
    isbn: string;
    publicationDate: Date;
    rackNumber: number;
    copies: ICopies[];
}
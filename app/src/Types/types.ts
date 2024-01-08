import { ICheckedOutBooks, IReservedBooks, Role } from "./interfaces";

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
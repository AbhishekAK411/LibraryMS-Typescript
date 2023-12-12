export interface ICheckOutBooks {
    bookItem: string;
    dueDate: Date;
    fine: number;
}

export interface IReservedBooks {
    book: string;
    notificationSent: boolean;
}

export interface ICopies {
    bookItem: string;
    isAvailable: boolean;
}
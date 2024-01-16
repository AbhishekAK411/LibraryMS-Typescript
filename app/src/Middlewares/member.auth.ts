import { TMember } from "Types/types";
import Member from "../Models/member";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { passwordValidator } from "../Utils/passwordValidator";
import bcrypt from "bcrypt";

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const validateAllMembers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            try {
                token = req.headers.authorization.split(" ")[1];
                const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
                req.user = await Member.findById(decode._id).select("-password");

                next();
            } catch (error) {
                return res.status(401).json({status: 401, success: false, message: "Not authorized."});
            }
        }else{
            return res.status(400).json({status: 400, success: false, message: "Authentication failed."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateCreateMember = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {first_name, last_name, email, password, confirmPassword, contact, address}: TMember = req.body;
        if(!first_name) return res.status(404).json({status: 404, success: false, message: "First name is required."});
        if(!last_name) return res.status(404).json({status: 404, success: false, message: "Last name is required."});
        if(!email) return res.status(404).json({status: 404, success: false, message: "Email is required."});
        if(!password) return res.status(404).json({status: 404, success: false, message: "Password is required."});
        if(!confirmPassword) return res.status(404).json({status: 404, success: false, message: "Password is required."});
        if(!contact) return res.status(404).json({status: 404, success: false, message: "Mobile number is required."});
        if(!address) return res.status(404).json({status: 404, success: false, message: "Address is required."});

        if(password !== confirmPassword) return res.status(400).json({status: 400, success: false, message: "Passwords do not match."});
        
        try {
            passwordValidator(password);
        } catch (error) {
            console.log(error);
            return res.status(400).json({status: 400, success: false, message: error.message});
        }

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateLoginMember = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password}: TMember = req.body;
        if(!email) return res.status(404).json({status: 404, success: false, message: "Email is required."});
        if(!password) return res.status(404).json({status: 404, success: false, message: "Password is required."});

        const findExistingMember: TMember = await Member.findOne({email}).exec();
        if(!findExistingMember) return res.status(404).json({status: 404, success: false, message: "Member not found."});

        const comparePassword = await bcrypt.compare(password, findExistingMember?.password);
        if(!comparePassword) return res.status(401).json({status: 401, success: false, message: "Invalid credentials."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateGetSingleMember = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { memberId } = req.params;
        if(!memberId) return res.status(404).json({status: 404, success: false, message: "Member id is required."});

        const findExistingMember: TMember = await Member.findById(memberId).exec();
        if(!findExistingMember) return res.status(404).json({status: 404, success: false, message: "Member not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateUpdateMember = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const memberId = req.params.memberId;
        if(!memberId) return res.status(404).json({status: 404, success: false, message: "Member id is required."});

        const findExistingMember: TMember = await Member.findById(memberId).exec();
        if(!findExistingMember) return res.status(404).json({status: 404, success: false, message: "Member not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateDeleteMember = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const memberId = req.params.memberId;
        if(!memberId) return res.status(404).json({status: 404, success: false, message: "Member id is required."});

        const findExistingMember: TMember = await Member.findById(memberId).exec();
        if(!findExistingMember) return res.status(404).json({status: 404, success: false, message: "Member not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateGetCheckedOutBooks = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const memberId = req.params.memberId;
        if(!memberId) return res.status(404).json({status: 404, success: false, message: "Member id is required."});

        const findExistingMember: TMember = await Member.findById(memberId).exec();
        if(!findExistingMember) return res.status(404).json({status: 404, success: false, message: "Member not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const validateCheckOutBook = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const memberId = req.params.memberId;
        const {bookId} = req.body;
        if(!memberId) return res.status(404).json({status: 404, success: false, message: "Member id is required."});
        if(!bookId) return res.status(404).json({status: 404, success: false, message: "Book id is requierd."});

        const findExistingMember: TMember = await Member.findById(memberId).exec();
        if(!findExistingMember) return res.status(404).json({status: 404, success: false, message: "Member not found."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
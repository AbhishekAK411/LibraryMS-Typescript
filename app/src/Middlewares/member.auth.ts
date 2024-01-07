import { TMember } from "Types/types";
import Member from "../Models/member";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { passwordValidator } from "../Utils/passwordValidator";

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
            return res.status(400).json({status: 400, success: false, message: error.message});
        }

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
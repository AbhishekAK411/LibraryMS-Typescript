import { NextFunction, Request, Response } from "express";

export const validateAllMembers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error"});
    }
}
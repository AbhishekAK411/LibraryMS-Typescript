import Member from "../Models/member";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const tokenMiddleware = async(req: Request, res: Response, next: NextFunction) => {
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
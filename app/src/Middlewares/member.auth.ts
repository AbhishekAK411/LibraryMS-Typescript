import { TMember } from "../Types/types";
import { NextFunction, Request, Response } from "express";
import Member from "../Models/member";

export const checkCreateMember = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { name }: TMember = req.body;
        if(!name) return res.status(404).json({status: 404, success: false, message: "Name is required."});

        next();
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const checkGetMembers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { memberId, token } = req.body;
        if(!memberId) return res.status(404).json({status: 404, success: false, message: "Member Id is required."});
        if(!token) return res.status(404).json({status: 404, success: false, message: "Please generate a token."});

        if(memberId && token){
            next();
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const checkGetMemberById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { memberId } = req.params;
        const { token } = req.body;
        if(!memberId) return res.status(404).json({status: 404, success: false, message: "Member Id is required."});
        if(!token) return res.status(404).json({status: 404, success: false, message: "Token is required."});

        const findExistingMember = await Member.findOne({memberId}).exec() as TMember | null;
        if(!findExistingMember) return res.status(404).json({status: 404, success: false, message: "Member does not exist."});
        if(findExistingMember.token !== undefined){
            next();
        }else{
            return res.status(400).json({status: 400, success: false, message: "Please generate another token."});
        }

        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
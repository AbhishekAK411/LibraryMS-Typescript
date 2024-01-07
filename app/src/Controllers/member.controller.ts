import { TMember } from "Types/types";
import Member from "../Models/member";
import { Request, Response } from "express";

export const allMembers = async(req: Request, res: Response) => {
    try {
        const findAllMembers = await Member.find().exec();
        if(findAllMembers){
            return res.status(200).json({status: 200, success: true, allMembers: findAllMembers});
        }else{
            return res.status(400).json({status: 400, success: false, message: "No members found."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const createMember = async(req: Request, res: Response) => {
    try {
        const {first_name, last_name, email, password, contact, address}: TMember = req.body;

        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
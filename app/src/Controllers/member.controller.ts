import { TMember } from "../Types/types";
import { Request, Response } from "express";
import { memberIDGenerator } from "../Utils/memberIDGenerator";
import Member from "../Models/member";

export const createMember = async(req: Request, res: Response) => {
    try {
        const { name }: TMember = req.body;
        const generateMemberId = memberIDGenerator(name);

        const findExistingMember = await Member.findOne({memberId: generateMemberId}).exec() as TMember | null;
        
        if(findExistingMember) return res.status(409).json({status: 409, success: false, message: "Member already exists."});
        const newMember = new Member({
            name,
            memberId: generateMemberId
        });

        await newMember.save();
        return res.status(201).json({status: 201, success: true, message: "Member created.", memberDetails: newMember});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const getMembers = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
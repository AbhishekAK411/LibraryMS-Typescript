import { TMember } from "../Types/types";
import Member from "../Models/member";
import { tokenGenerator } from "../Utils/tokenGenerator";
import { Request, Response } from "express";

export const generateToken = async(req: Request, res: Response) => {
    try {
        const { memberId } = req.body;
        if(!memberId) return res.status(404).json({status: 404, success: false, message: "Member ID is required."});
        //* Finding member
        const findMember = await Member.findOne({memberId}).exec() as TMember | null;
        if(!findMember) return res.status(404).json({status: 404, success: false, message: "Member does not exist."});
        
        //* Token Generation
        let tokenGen = tokenGenerator();
        
        //* Assigning token to member
        findMember.token = tokenGen;
        await findMember.save();

        return res.status(200).json({status: 200, success: true, message: "Token generated successfully.", token: tokenGen});
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, success: false, messag: "Internal server error."});
    }
}
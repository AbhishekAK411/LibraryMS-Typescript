import { TMember } from "Types/types";
import Member from "../Models/member";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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

        const findExistingMember: TMember = await Member.findOne({email}).exec();
        if(findExistingMember) return res.status(404).json({status: 404, success: false, message: "Member already exists."});

        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const newMember = new Member({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                contact: contact,
                address: address
            });
    
            await newMember.save();
            return res.status(201).json({status: 201, success: true, message: "Member registered successfully."});
        } catch (error) {
            return res.status(400).json({status: 400, success: false, message: error.message});
        }
        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const loginMember = async(req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
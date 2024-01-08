import { TMember, TUserID } from "Types/types";
import Member from "../Models/member";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const allMembers = async(req: Request, res: Response) => {
    try {
        const findAllMembers = await Member.find().exec();
        if(findAllMembers.length > 0){
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
                first_name,
                last_name,
                email,
                password: hashedPassword,
                contact,
                address
            });
    
            await newMember.save();
            return res.status(201).json({status: 201, success: true, message: "Member registered successfully."});
        } catch (error) {
            console.log(error);
            return res.status(400).json({status: 400, success: false, message: "error"});
        }
        
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const loginMember = async(req: Request, res: Response) => {
    try {
        const { email }: TMember = req.body;

        const findExistingMember = await Member.findOne({email}).select("-password").exec();
        const userId: TUserID = {
            id: findExistingMember._id
        }

        const token: string = jwt.sign(userId, process.env.JWT_SECRET);
        return res.status(200).json({status: 200, success: true, message: "Logged in successfully.", token: token});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const getSingleMember = async(req: Request, res: Response) => {
    try {
        const memberId = req.params.memberId;

        const findSingleMember: TMember = await Member.findById(memberId).exec();
        return res.status(200).json({status: 200, success: false, member: findSingleMember});
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const updateMember = async(req: Request, res: Response) => {
    try {
        const memberId = req.params.memberId;
        const { first_name, last_name, password, contact, address }: TMember = req.body;
        
        const updateMember = await Member.findByIdAndUpdate(memberId, {
            first_name,
            last_name,
            password,
            contact,
            address
        }, {
            new: true
        });

        if(updateMember){
            return res.status(200).json({status: 200, success: true, message: "Updated member successfully.", member: updateMember});
        }else{
            return res.status(400).json({status: 400, success: false, message: "Failed to updated member. Please try again."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}

export const deleteMember = async(req: Request, res: Response) => {
    try {
        const memberId = req.params.memberId;

        const deleteMember = await Member.findByIdAndDelete(memberId, { new: true}).exec();

        if(deleteMember){
            return res.status(200).json({status: 200, success: true, message: "Removed member."});
        }else{
            return res.status(400).json({status: 400, success: false, message: "Failed to remove member."});
        }
    } catch (error) {
        return res.status(500).json({status: 500, success: false, message: "Internal server error."});
    }
}
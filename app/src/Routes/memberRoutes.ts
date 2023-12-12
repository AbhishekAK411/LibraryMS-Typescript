import member from "Models/member";
import { createMember, getMemberById, getMembers } from "../Controllers/member.controller";
import { checkCreateMember, checkGetMemberById, checkGetMembers } from "../Middlewares/member.auth";
import express from "express";

const memberRouter = express.Router();

memberRouter.post("/create", checkCreateMember, createMember);
memberRouter.post("/", checkGetMembers, getMembers);
memberRouter.post("/:memberId", checkGetMemberById, getMemberById);

export default memberRouter;
import { createMember, getMembers } from "../Controllers/member.controller";
import { checkCreateMember, checkGetMembers } from "../Middlewares/member.auth";
import express from "express";

const memberRouter = express.Router();

memberRouter.post("/create", checkCreateMember, createMember);
memberRouter.post("/", checkGetMembers, getMembers);

export default memberRouter;
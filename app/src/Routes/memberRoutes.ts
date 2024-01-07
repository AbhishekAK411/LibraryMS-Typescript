import { allMembers } from "Controllers/member.controller";
import { validateAllMembers } from "../Middlewares/member.auth";
import express from "express";

const router = express.Router();

router.get("/", validateAllMembers, allMembers);

export default router;
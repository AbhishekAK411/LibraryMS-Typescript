
import { tokenMiddleware } from "../Middlewares/auth";
import { allMembers, createMember, deleteMember, getSingleMember, loginMember, updateMember } from "../Controllers/member.controller";
import { validateAllMembers, validateCreateMember, validateDeleteMember, validateGetSingleMember, validateLoginMember, validateUpdateMember } from "../Middlewares/member.auth";
import express from "express";

const router = express.Router();

//* Member routes (member)
router.get("/", validateAllMembers, allMembers);
router.post("/create", validateCreateMember, createMember);
router.post("/login", validateLoginMember, loginMember);
router.get("/:memberId", tokenMiddleware, validateGetSingleMember, getSingleMember);
router.put("/update/:memberId", tokenMiddleware, validateUpdateMember, updateMember);
router.delete("/cross/:memberId", tokenMiddleware, validateDeleteMember, deleteMember);

export default router;
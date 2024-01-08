
import { allMembers, createMember, loginMember } from "../Controllers/member.controller";
import { validateAllMembers, validateCreateMember, validateLoginMember } from "../Middlewares/member.auth";
import express from "express";

const router = express.Router();

//* Member routes (member)
router.get("/", validateAllMembers, allMembers);
router.post("/create", validateCreateMember, createMember);
router.post("/login", validateLoginMember, loginMember);
// router.get("/:memberId", validateGetSingleMember, getSingleMember);
// router.put("/:memberId", validateUpdateMember, updateMember);
// router.delete("/:memberId", validateDeleteMember, deleteMember);

export default router;
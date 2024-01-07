
import { allMembers, createMember } from "../Controllers/member.controller";
import { validateAllMembers, validateCreateMember } from "../Middlewares/member.auth";
import express from "express";

const router = express.Router();

//* Member routes (member)
router.get("/", validateAllMembers, allMembers);
router.post("/create", validateCreateMember, createMember);
// router.get("/:memberId", validateGetSingleMember, getSingleMember);
// router.put("/:memberId", validateUpdateMember, updateMember);
// router.delete("/:memberId", validateDeleteMember, deleteMember);

export default router;
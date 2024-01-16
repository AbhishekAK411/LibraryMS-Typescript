
import { tokenMiddleware } from "../Middlewares/auth";
import { allMembers, checkOutBook, createMember, deleteMember, getCheckedOutBooks, getSingleMember, loginMember, updateMember } from "../Controllers/member.controller";
import { validateAllMembers, validateCheckOutBook, validateCreateMember, validateDeleteMember, validateGetCheckedOutBooks, validateGetSingleMember, validateLoginMember, validateUpdateMember } from "../Middlewares/member.auth";
import express from "express";

const router = express.Router();

//* Member routes (member)
router.get("/", validateAllMembers, allMembers);
router.post("/create", validateCreateMember, createMember);
router.post("/login", validateLoginMember, loginMember);
router.get("/:memberId", tokenMiddleware, validateGetSingleMember, getSingleMember);
router.put("/update/:memberId", tokenMiddleware, validateUpdateMember, updateMember);
router.delete("/cross/:memberId", tokenMiddleware, validateDeleteMember, deleteMember);

//* Member book related routes(member->book)
router.get("/:memberId/checked-out-books", tokenMiddleware, validateGetCheckedOutBooks, getCheckedOutBooks);
router.post("/:memberId/checkout", tokenMiddleware, validateCheckOutBook, checkOutBook);

export default router;